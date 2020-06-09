const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');
dotenv.config();

mongoose
    .connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true }
    )
    .then(() => console.log('DB connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connenction error: ${err.message}`)
});

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.get("/",(req,res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if(err) {
            res.status(400).json({
                error: err
            })
        }
        const docs = JSON.parse(data);
        res.json(docs);
    })
})


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: "Unauthorized"
        })
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A node js API is listening on port: ${port}`);
});