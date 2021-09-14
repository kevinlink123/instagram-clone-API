const db = require('../models');
const User = db.user;

checkDuplicateUsername = async (req, res, next) => {
    try{
        if(!req.body.username){
            res.status(404).send({
                message: "No username provided"
            });
            return;
        }

        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
    
        if(user) {
            res.status(400).send({
                message: "Failed! Username already registered"
            });
            return;
        }
    } catch(err){
        console.log(err);
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername,
}

module.exports = verifySignUp;