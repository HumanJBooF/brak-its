module.exports = (sequelize, DataTypes) => {
    const Matches = sequelize.define('matches', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        p1Score: { type: DataTypes.INTEGER },
        p2Score: { type: DataTypes.INTEGER },
        winner: { type: DataTypes.STRING },
        matchNum: { type: DataTypes.INTEGER },
        nextMatch: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
        { paranoid: true }
    );

    Matches.associate = models => {
        Matches.belongsTo(models.tourneys, { as: 'tourneyId', foreignKey: 'tourney' });
    }

    return Matches;
}