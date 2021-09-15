const db = require("../models");
const Image = db.image;
const User = db.user;
const Like = db.like;


exports.allAccess = (req, res) => {
    res.status(200).send("Welcome to our homepage (Public content).");
};

exports.mainPage = (req, res) => {

    res.status(200).send("Main Page with images.");
};

exports.postLike = async (req, res) => {
    if(!req.body.imageId) {
        return res.status(404).send({
            message: "The image that you are trying to like doesn't exist!"
        })
    }
    
    const [like, created] = await Like.findOrCreate({
        where: { 
            imageId: req.body.imageId,
            userId: req.userId
        }
    });

    if(!created) {
        const image = await Image.findOne({
            where: {
                id: req.body.imageId
            }
        });
        await Image.update({ likesCount: image.likesCount - 1 }, {
            where: {
                id: image.id
            }
        })

        await like.destroy();

        return res.status(200).send({
            likeCreated: false
        })
    }

    const image = await Image.findOne({
        where: {
            id: req.body.imageId
        }
    });

    await Image.update({ likesCount: image.likesCount + 1 }, {
        where: {
            id: image.id
        }
    })
    console.log(image.likesCount)
    

    res.status(200).send({
        likeCreated: true
    })
}