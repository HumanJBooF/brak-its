module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('match', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        winner: { type: DataTypes.INTEGER },
        matchNum: { type: DataTypes.INTEGER },
        nextMatch: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
        { paranoid: true }
    );

    Match.associate = models => {
        Match.belongsTo(models.tourneys, { as: 'tourney' });
        Match.belongsTo(models.signUp, { as: 'player1' });
        Match.belongsTo(models.signUp, { as: 'player2' });
    }

    return Match;
}