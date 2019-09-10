var cloudinary = require('cloudinary').v2;
var CRED_OBJECTS = require('../../../cred');
var COLLECTIONS = require('../constants.controller').MONGO_DB.COLLECTIONS;
var HelperController = require('../helperControllers/helperController');
var MongoDBConnectController = require('../mongoDBControllers/mongoDBConnectController');
var helperController = new HelperController();
var mongoDBConnectController = new MongoDBConnectController();

cloudinary.config({
  cloud_name: CRED_OBJECTS.CLOUDINARY.CLOUD_NAME,
  api_key: CRED_OBJECTS.CLOUDINARY.API_KEY,
  api_secret: CRED_OBJECTS.CLOUDINARY.API_SECRET
});


class PhotoUploaderController {

  uploadAndSave(req, res, db) {
    return new Promise((resolve, reject) => {
      const options = { unique_filename: false, overwrite: true, use_filename: true };
      const filePath = req.body.payload.userImage;

      cloudinary.uploader.upload(filePath, options, (error, result) => {
        if (error) reject(error);
        
        const email = helperController.decoreJWT(req.headers.token).email;
        const imageUrl = result.secure_url;
        var dbo = db.db(CRED_OBJECTS.database);

        dbo.collection(COLLECTIONS.LOGIN).find({ email }).toArray((err, dbResult) => {
          if (err) reject(err);
          var newvalues = { $set: { profile_image: imageUrl } };
          mongoDBConnectController.updateOne(db, COLLECTIONS.LOGIN, { email }, newvalues).then((res) => {
            resolve(newvalues);
          }, err => reject(err));
        });
      })
    })
  }

}

module.exports = PhotoUploaderController;