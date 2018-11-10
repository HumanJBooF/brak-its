module.exports = (sequelize, DataTypes) => {
    const Rounds = sequelize.define('rounds', {
        p1_score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        p2_score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        winner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        round_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        next_round: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        paranoid: true
    });
    Rounds.associate = models => {
        Rounds.belongsTo(models.tourneys, {
            as: 'tourneyId',
            foreignKey: 'tourney'
        });

    }

    return Rounds;
}