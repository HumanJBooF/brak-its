const db = require('../models/');

const tourneyController = {

    findAll: (req, res) => {
        db.tourneys.findAll({})
            .then(dbTourneys => {
                res.json({ tournaments: dbTourneys });
            })
            .catch(err => res.json({ error: err }))
    },

    findOne: (req, res) => {
        db.tourneys.findOne({
            where: {
                uuid: req.body.uuid
            }
        }).then(dbTourney => {
            res.json({ tournament: dbTourney });
        }).catch(err => res.json({ error: err }))
    }
};

module.exports = tourneyController;