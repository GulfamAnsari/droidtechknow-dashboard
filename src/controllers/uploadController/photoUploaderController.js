// var fs = require('fs');
// var base64Img = require('base64-img'); // npm i base64-img

class PhotoUploaderController {

  upload(req, res, db) {
    return new Promise((resolve, reject) => {
      // var newImg = fs.readFileSync('/home/gulfamansari/Pictures/f-stop.png');
      // var encImg = newImg.toString('base64');
      // var newItem = {
      //   img: Buffer(encImg, 'base64')
      // };

      // var filepath = base64Img.imgSync(`data:image/png;${encImg}`, '', '2');
      // console.log(filepath)
      // require("fs").writeFile("out.png", newItem.img, 'base64', function (err) {
      //   console.log(err);
      //   resolve(filepath)
      // });
    })
  }

}

module.exports = PhotoUploaderController;