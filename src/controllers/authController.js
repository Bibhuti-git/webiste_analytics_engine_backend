const {registerwebsite,getAPIKey,revokeAPIKey} = require('../services/authService');

exports.register = async(req,res)=>{
 const website = req.body.website;
 if(!website){
     return res.status(400).json({error:'Website is required😒'});
 }
    const apiKey = await registerwebsite(website);
    res.status(201).json({apiKey:apikey.key});
};

exports.getKey = async(req,res)=>{

    const {website} = req.body;
    const apiKey = await getAPIKey(website);
    if(!apiKey){
        return res.status(404).json({error:'API Key not found😒'});
    }   

    res.status(200).json({apiKey:apiKey.key});

};

exports.revoke = async(req,res)=>{
    const {website} = req.body;

    await revokeAPIKey(website);
    res.status(200).json({message:'API Key revoked successfully🥳'});
}
