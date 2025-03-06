const mongoose = require('mongoose');
 const {v4:uuidv4} = require('uuid');

 const APIKeySchema = new mongoose.Schema({
    key:{type: String, default: uuidv4, unique: true},
    webiste:{type:String, required:true},
    isActive:{type:Boolean, default: true},
    createdAt:{type:Date, default: Date.now}
 });

 module.exports =mongoose.model('APIKey', APIKeySchema);