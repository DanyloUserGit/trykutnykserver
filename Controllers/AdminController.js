const Post = require("./../Models/Admin/PostModel");
const Admin = require("./../Models/Admin/AdminModel");
const bcrypt = require('bcrypt')
const {unlink} = require('fs');
class AdminController{
    async post (req, res) {
        try {
            // console.log(req.body);
            // console.log(req.files[0].originalname);
            // file:///D:/Trikutnyk
            const {header, description, date, url, img} = req.body;
            const candidate = await Post.findOne({header});
            if(candidate){
                return res.status(400).json({message: "post already exist"});
            }
            const post = new Post({header, description, date, url:url, img:img});
            await post.save();
            return res.json({message: "posted successfully!"});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: `${req.body} something went wrong`});
        }
    }
    async posts (req, res){
        try {
            const data = await Post.find({});
            return res.json(data);
        } catch (error) {
            console.log(error);
            res.status(400).json({message: "something went wrong"});
        }
    }
    async delete (req, res) {
        try {
            const {header, img} = req.body;
            // const post = await Post.findOneAndDelete({header:header});
            // if(!post){
            //     return res.status(400).json({message: "post does not exist"});
            // }
            await Post.findOneAndRemove({header});
            console.log(header);
            const path = `${__dirname}/../media/${img}`;
            unlink(path, (error)=>{
                if(error){
                    console.log(img);
                    res.status(400).json({message: error});
                }
                console.log("done");
            })
            return res.json({message: "post deleted successfully"});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: "something went wrong"});
        }
    }
    async login (req, res) {
        try {
            const {password} = req.body;
            if(!password){
                return res.status(400).json({message: "wrong password value" + " " + password});
            }
            const admin = await Admin.findOne({name: "admin"});
            const validpassword = bcrypt.compareSync(password, admin.password);
            if(!validpassword){
                return res.send({status: validpassword});
            }
            return res.send({status: validpassword});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: "something went wrong"});
        }
    }
    async users (req, res) {
        try {
            res.json("works");
            const name = "admin";
            // const password = (Math.random() + 1).toString(36).substring(2);
            const hashpass = bcrypt.hashSync("5jxeta6gnq", 5);
            const admin = new Admin({name, password: hashpass});
            await admin.save();
            return res.json("done");
        } catch (error) {
            console.log(error);
            res.status(400).json({message: "something went wrong"});
        }
    }
}

module.exports = new AdminController(); 