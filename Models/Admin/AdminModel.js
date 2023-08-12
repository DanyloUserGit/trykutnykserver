const {Schema, model} = require('mongoose');

const Admin = new Schema ({
    name: {type:String, unique:true, required: true},
    password: {type:String, unique:true, required: true},
})

module.exports = model("Admin", Admin);