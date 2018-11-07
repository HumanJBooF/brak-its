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
        }
    });
    Rounds.associate = models => {
        Rounds.belongsTo(models.tourneys, {
            as: 'tourney_',
            foreignKey: 'tourney'
        });

    }

    return Rounds;
}