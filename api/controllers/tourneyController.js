const db = require('../models/');

const tourneyController = {

    find_all_recent: (req, res) => {
        db.tourneys.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        }).then(dbTourneys => {
            res.json({ tournament: dbTourneys});
        }).catch(err => res.json({ error: err }));
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
        db.tourneys.create(req.body)
            .then(dbTourney => {
                res.json({tournament: dbTourney})
            }).catch(err => res.json({ error: err }));
    }
};

module.exports = tourneyController;