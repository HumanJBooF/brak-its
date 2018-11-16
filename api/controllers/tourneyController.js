const db = require('../models/');

const tourneyController = {

    find_all: (req, res) => {
        db.tourneys.findAll({})
            .then(dbTourneys => {
                res.json({ tournaments: dbTourneys });
            })
            .catch(err => res.json({ error: err }))
    },

    find_all_for_owner: (req, res) => {
        db.tourneys.findOne({
            where: {
                uuid: req.body.uuid
            }
        }).then(dbTourney => {
            res.json({ tournament: dbTourney });
        }).catch(err => res.json({ error: err }))
    },

    create: (req, res) => {
        console.log(req.body)
        db.tourneys.create(req.body)
            .then(dbTourney => {
                console.log(dbTourney);
            }).catch(err => res.json({ error: err }));
    }
};

module.exports = tourneyController;