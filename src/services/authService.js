const APIKey = require('../models/APIKey');

const registerwebsite = async (webiste)=>{

    const newAPIKey = new APIKey({ webiste});
    await newAPIKey.save();
    return newAPIKey;
};

const getAPIKey = async (key)=>{
    return await APIKey.findOne({webiste, isActive:true});
};

const revokeAPIKey = async (webiste)=>{
    return await APIKey.findOneAndUpdate({webiste},{isActive:false})
};

module.exports = {
    registerwebsite,
    getAPIKey,
    revokeAPIKey
};
