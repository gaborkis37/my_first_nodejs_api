const { check, validationResult } = require('express-validator');

exports.createPostValidator = (req, res, next) => {
    req.check('title', "Write a title").notEmpty();
    req.check('title',"Title must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    })

    req.check('body', "Write a body").notEmpty();
    req.check('body',"Body must be between 4 to 2000 characters").isLength({
        min: 4,
        max: 150
    })

    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError});
    }
    next();
}

exports.userSignupValidator = (req, res, next) => {
    req.check('name',"Name must not be empty").notEmpty();
    req.check('name',"Name must be between 5 to 30 characters").isLength({
        min: 5,
        max: 30
    });
    req.check('email',"Email must not be empty").notEmpty();
    req.check('email',"Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 3,
        max: 32
    });
    req.check('password',"Password must not be empty").notEmpty();
    req.check('password')
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")

    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError});
    }
    next();
}