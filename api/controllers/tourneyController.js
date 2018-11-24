const db = require('../models/');

const tourneyController = {

    find_one: (req, res) => {
        const id = req.params.id;
        const owner = req.params.owner;
        console.log(id, 'find_one')
        db.tourneys.findOne({
            where: {
                uuid: id,
                owner: owner
            }
        }).then(dbTourney => {
            dbTourney.getUsers().then(users => res.json({
                users: users,
                tournament: dbTourney
            }))
        }).catch(err => res.json({ error: err }))
    },

    find_all_recent: (req, res) => {
        db.tourneys.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        }).then(dbTourneys => {
            res.json({ tournament: dbTourneys });
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
                res.json({ tournament: dbTourney })
            }).catch(err => res.json({ error: err }));
    },

    join_tourney: (req, res) => {
        const tourneyId = req.body.tourneyId;
        const username = req.body.username;
        db.users.findOne({
            where: {
                username: username
            }
        }).then(user => {
            const userId = user.uuid
            console.log(userId)
            db.tourneys.findOne({
                uuid: tourneyId,
            }).then(tourney => {
                console.log(tourney, 'IN THE .THEN')
                tourney.addUsers(userId).then(() => {
                    res.json({ user: user })
                })

            })
        })
    },

    get_all_users_tourney: (req, res) => {
        const tourneyId = req.body.tourneyId;
        db.tourney.findOne({
            where: {
                uuid: tourneyId
            }
        }).then(tourney => {
            tourney.getUsers().then(usersTourney => {
                //send all users to matches here gonna start in the morning
            })
        })
    }
};

module.exports = tourneyController;