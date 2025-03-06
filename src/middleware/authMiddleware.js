const APIKey = require('../models/apiKey');

const authenticateAPIKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({message: 'API Key is required'});
    }

    const validKey = await APIKey.findOne({key:apiKey, isActive:true});
    if (!validKey) {
        return res.status(401).json({message: 'Invalid API Key'});
    }
    next();
};

module.exports = authenticateAPIKey;