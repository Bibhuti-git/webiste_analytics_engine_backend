const Event = require('../models/event');

const collectEvent = async (eventData) => {

    const event = new Event(eventData);
    await event.save(); 
    return event;

};

const getEventSummary = async({event,startDate,endDate,app_id}) => {
    const matchQuery = {event};
    if (startDate && endDate) {
        matchQuery.timestamp = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    if (app_id) {
        matchQuery.app_id = app_id;
    }

    const result   = await Event.aggregate([
        {$match: matchQuery},
        {
            $group:{
                _id:"$event",
                count:{$sum:1},
                uniqueUsers:{$addToSet:"$ipAddress"},
                deviceData:{
                    $push:"$device"
                },
            },
        },
        {
            $project:{
                event:"$id",
                count:1,
                uniqueUsers:{$size:"$uniqueUsers"},
                deviceData:{
                    $reduce:{
                        input:"$deviceData",
                        initialValue:{},
                        in:{
                            $mergeObjects:[
                                "$$value",
                                {$arrayToObject:[[{k:"$$this", v :{$sum:1}}]]},

                            ]
                        },
                    },
                },
            },
        },
    ]);

    return result.length ? result[0]:null;

};

const getUserStats =  async (userId)=>{
    const userEvents = await Event.find({ipAddress:userId}).sort({timestamp:-1});

    if (!userEvents.length) {
        return null;
    }

    const latestEvent = userEvents[0];

    return {
        userId,
        totalEvenets:userEvents.length,
        deviceDetails:latestEvent.metaData,
        ipAddress:latestEvent.ipAddress,
    };
};



module.exports  = { collectEvent,getEventSummary,getUserStats};