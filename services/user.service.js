const Models = require('../database/models');

module.exports = class UserService {
    static getUserByEmail = async (userEmail) => {
        try {
            const user = await Models.User.findOne({ where: { email: userEmail }});
            return user;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };
};