module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
        url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },

        likesCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return Image;
}