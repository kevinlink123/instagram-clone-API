const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket("kevin-insta-clone");

const db = require("../models");
const Image = db.image;
const User = db.user;
const Like = db.like;

const getRanmdonNumber = () => {
  return Math.floor(
    Math.random() * 999999999
  )
}

exports.getAllImages = async (req, res) => {
  
  const images = await Image.findAll({ include: { model: Like, as: 'likes'} });

  return res.status(200).send({
    images: images
  })
}

exports.uploadImage = async (req, res) => {
    try {
        if(!req.body.description){
          return res.status(400).send({ message: "Description required" });
        }
        console.log(req.userId)
        const user = await User.findOne({
          where: {
              id: req.userId
          }
        });

        if(!user){
          return res.status(404).send({
              message: "user not found."
          });
        }

        const imageParams = {
          description: req.body.description,
          userId: user.id,
          url: ''
        };

        await processFile(req, res);

        if (!req.file) {
          return res.status(400).send({ message: "Please upload a file!" });
        }
        
        const fileName = getRanmdonNumber() + req.file.originalname;
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        blobStream.on("error", (err) => {
          res.status(500).send({ message: err.message });
        });

        blobStream.on("finish", async (data) => {
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
          
          imageParams.url = publicUrl;

          const image = await Image.create(imageParams);
    
          try {
            await bucket.file(fileName).makePublic();
          } catch {
            return res.status(201).send({
              message:
                `Uploaded the file successfully: ${req.file.originalname}`,
              url: publicUrl,
            });
          }
    
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname
          });
        });
    
        blobStream.end(req.file.buffer);
      } catch (err) {
        res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
      }
}

exports.deleteImage = async (req, res) => {
  try{
      if(!req.body.id){
          return res.status(400).send({
              message: 'you need to give an id.'
          })
      }

      const image = await Image.findOne({
          where: {
              id: req.body.id
          }
      });

      if(!image){
          return res.status(404).send({
              message: "The image doesn't exist."
          })
      }

      await image.destroy();
      res.status(200).send({
          message: "Image deleted succesfully."
      })


  } catch(err) {
      console.log(err);
      res.status(500).send({
          message: "Failed trying deleting image"
      })
  }
}