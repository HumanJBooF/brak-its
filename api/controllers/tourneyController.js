const db = require('../models/');

const tourneyController = {

    find_one: (req, res) => {
        const id = req.params.id;
        const owner = req.params.owner;
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
            limit: 10,
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
        const tourney = req.body;
        db.tourneys.create(tourney)
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
                tourney.update({ actualSize: db.Sequelize.literal('actualSize + 1') })
                tourney.addUsers(userId).then(() => res.json({ user: user }))
                    .catch(err => res.json({ err: err }));
            }).catch(err => res.json({ err: err }));
        }).catch(err => res.json({ err: err }));
    },

    get_all_users_tourney: (req, res) => {
        const id = req.body.id;
        db.tourneys.findOne({
            where: {
                uuid: id
            }
        }).then(tourney => {
            tourney.getUsers({
                order: [[db.Sequelize.literal(`signUp.createdAt`), 'ASC']]
            }).then(usersTourney => {
                res.json({ users: usersTourney });
            }).catch(err => res.json({ err: err }));
        }).catch(err => res.json({ err: err }));
    },

    send_users_to_matches: (req, res) => {
        const matches = req.body.matches;
        const tourneyId = req.body.matches[0].tourneyUuid
        db.match.bulkCreate(matches, {
            include:
                [{ model: db.signUp, as: 'player1' },
                { model: db.signUp, as: 'player2' },
                { model: db.tourneys, as: 'tourneys' }]
        }).then(match => {
            res.json({ match: match })
            db.tourneys.update({ isActive: 'In progress' }, { where: { uuid: tourneyId } })
                .then(tourney => console.log(tourney))
                .catch(err => res.json({ err: err }))
        }).catch(err => res.json({ err: err }))
    },

    get_players: (req, res) => {
        const id = req.params.id;
        db.tourneys.findOne({
            where: {
                uuid: id
            }
        }).then(tourney => {
            tourney.getUsers({}).then(users => {
                db.match.findAll({
                    where: {
                        tourneyUuid: id
                    }
                }).then(matches => {
                    const userMatches = { matches, users };
                    res.json(userMatches);
                }).catch(err => res.json({ err: err }));
            }).catch(err => res.json({ err: err }));
        })
    },

    create_next_match: (req, res) => {
        console.log(req.body)
        const match = req.body.match;
        const winner = req.body.winner.winner;
        const matchNum = req.body.winner.matchNum;
        const id = req.body.winner.tourneyUuid;
        const nextMatch = req.body.winner.nextMatch;
        db.match.create(match)
            .then(match => {
                db.match.update({ winner: winner }, {
                    where: {
                        winner: null,
                        tourneyUuid: id,
                        matchNum: matchNum,
                        nextMatch: nextMatch
                    }
                }).then(winner => {
                    res.json({ match: match, winner: winner });
                })
                    .catch(err => res.json({ err: err }))
            }).catch(err => res.json({ err: err }))
    },

    update_match: (req, res) => {
        const id = req.body.info.next.tourneyUuid;
        const matchNum = req.body.info.next.matchNum;
        const player = req.body.info.next.player;
        const winner = req.body.info.winner.winner;
        const matchWinNum = req.body.info.winner.matchNum;
        const nextMatchWin = req.body.info.winner.nextMatch;
        db.match.update(player, {
            where: {
                tourneyUuid: id,
                matchNum: matchNum
            }
        }).then(match => {
            db.match.update({ winner: winner }, {
                where: {
                    winner: null,
                    tourneyUuid: id,
                    matchNum: matchWinNum,
                    nextMatch: nextMatchWin
                }
            }).then(winner => {
                res.json({ match: match, winner: winner });
            }).catch(err => res.json({ err: err }))
        }).catch(err => res.json({ err: err }))
    },

    end_match: (req, res) => {
        const id = req.body.id;
        db.tourneys.update({ isActive: 'Finished' }, {
            where: {
                uuid: id
            }
        }).then(tourney => res.json({ tournament: tourney }))
            .catch(err => res.json({ err: err }))
    },

    find_search: (req, res) => {
        const searchTerm = req.params.search;
        console.log(searchTerm)
        db.tourneys.findAll({
            where: {
                gameType: searchTerm
            }
        }).then(tourneys => res.json({ tourneys: tourneys }))
            .catch(error => res.json({ err: err }))
    },
}


module.exports = tourneyController;