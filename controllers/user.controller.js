const UserService = require('../services/user.service');
const HttpError = require('http-errors');
const JWT = require('jsonwebtoken');

require('dotenv').config();

module.exports = class UserController {
    static login = async (req, res, next) => {
        try {
            const user = await UserService.getUserByEmail(req.body.email);

            if (!user) {
                return next(HttpError.NotFound('User Does Not Exist!'));
            }
            if (user.password !== req.body.password) {
                return next(HttpError.Unauthorized('Invalid Credentials!'));
            }

            const userId = user.id;
            const token = JWT.sign(
                {
                    sub: userId,
                    email: req.body.email,
                },
                process.env.JWT_SECRET_KEY,
            );

            return res.status(200).json({
                access_token: token
            });
        }
        catch (err) {
            return next(err);
        }
    };
};