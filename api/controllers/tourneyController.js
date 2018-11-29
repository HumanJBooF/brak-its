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
        }).then(dbTourney => res.json({ tournament: dbTourney }))
            .catch(err => res.json({ error: err }))
    },

    create: (req, res) => {
        db.tourneys.create(req.body)
            .then(dbTourney => res.json({ tournament: dbTourney }))
            .catch(err => res.json({ error: err }));
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
            db.tourneys.findOne({
                where: {
                    uuid: tourneyId
                }
            }).then(tourney => {
                tourney.update({ actualSize: +1 })
                tourney.addUsers(userId)
                    .then(() => res.json({ user: user }))
                    .catch(err => res.json({ err: err }));
            }).catch(err => res.json({ err: err }));
        }).catch(err => res.json({ err: err }));
    },

    get_all_users_tourney: (req, res) => {
        console.log(req.body.id)
        const id = req.body.id;
        db.tourneys.findOne({
            where: {
                uuid: id
            }
        }).then(tourney => {
            tourney.getUsers({
                order: [['createdAt', 'ASC']]
            }).then(usersTourney => {
                res.json({ users: usersTourney });
            }).catch(err => res.json({ err: err }));
        }).catch(err => res.json({ err: err }));
    },

    send_users_to_matches: (req, res) => {
        const userArr = req.body;
        console.log(userArr.map(obj => obj.tourneyId))
        // db.tourneys.findOne({
        //     where: {
        //         uuid: id
        //     }
        // })
    }
}


module.exports = tourneyController;