module.exports = (sequelize, DataTypes) => {
    const Matches = sequelize.define('matches', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
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
    }, {
            paranoid: true
        });
    Matches.associate = models => {
        Matches.belongsTo(models.tourneys, {
            as: 'tourneyId',
            foreignKey: 'tourney'
        });

    }

    return Matches;
}