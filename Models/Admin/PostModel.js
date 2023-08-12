const {Schema, model} = require('mongoose');

const Post = new Schema ({
    header: {type:String, unique:true, required: true},
    description: {type:String, unique:true, required: true},
    img: {type:String, unique:true, required:true},
    url: {type:String, unique: true},
    date: {type:String, required: true}
})

module.exports = model("Post", Post);