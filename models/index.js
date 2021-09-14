const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
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