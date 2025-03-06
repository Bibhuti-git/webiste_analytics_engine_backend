const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    event:String,
    url:String,
    referrer:String,
    device:String,
    ipAddress:String,
    timestamp: { type: Date, default: Date.now },
    metaData :Object,
});

module.exports = mongoose.model('Event', EventSchema);