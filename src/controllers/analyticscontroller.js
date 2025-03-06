const {collectEvent} = require('../services/analyticsService');

exports.collect = async (req, res) => {
    try {
        const event = await collectEvent(req.body);
        res.status(200).json({mesage: 'Event collected', eventId : event._id});
    } catch (error) {
        res.status(400).json({message: "failed to collect event😔"});
        
    }
};


exports.eventSummary = async (req, res) => {
    try {
        const {event, startDate, endDate, app_id} = req.query;
        if (!event) {
            return res.status(400).json({message: 'event is required'});
        }

        const summary = await getEventSummary({event, startDate, endDate, app_id});
        if (!summary) {
            return res.status(404).json({message: 'No data found'});
        }
        res.status(200).json(summary);
    } catch (error) {
        res.status(400).json({message: "failed to get event summary😔"});
        
    }
};

exports.userStats = async (req, res) => {   
        try {
            const userId = req.query;
            if (!userId) {
                return res.status(400).json({message: 'userId is required'});
            }   

            const stats = await getUserStats(userId);
            if (!stats) {
                return res.status(404).json({message: 'No data found'});
            }
            res.status(200).json(stats);
            
        } catch (error) {
            res.status(400).json({message: "failed to get user stats😔"})   ;
            
        }
};
