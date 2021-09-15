const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.image = require('../models/image.model.js')(sequelize, Sequelize);
db.like = require('../models/like.model')(sequelize, Sequelize);

db.user.hasMany(db.image, {as: 'images'});
db.image.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user '
});

db.image.hasMany(db.like, {as: 'likes'});
db.like.belongsTo(db.image, {
    foreignKey: 'imageId',
    as: 'image'
});

db.user.hasOne(db.like);
db.like.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = db;