const Router = require('express');
const router = new Router();
const controller = require('./../Controllers/AdminController');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb){
//         cb(null, `${__dirname}/../media`);
//     },
//     filename: function (req, file, cb){
//         cb(null, file.originalname);
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 5242880 // 5 mb
//     },
// });


router.post("/post",controller.post);
router.delete("/deletepost", controller.delete);
router.post("/login", controller.login);
router.get("/allposts", controller.posts);
router.get("/users", controller.users);

module.exports = router;