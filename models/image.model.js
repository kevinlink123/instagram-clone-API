module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
        url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        likesCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return Image;
}