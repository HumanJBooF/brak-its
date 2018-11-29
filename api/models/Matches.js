module.exports = (sequelize, DataTypes) => {
    const Matches = sequelize.define('matches', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        // playerOne: { type: DataTypes.STRING, defaultValue: null },
        // playerTwo: { type: DataTypes.STRING, defaultValue: null },
        winner: { type: DataTypes.STRING },
        matchNum: { type: DataTypes.INTEGER },
        nextMatch: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
        { paranoid: true }
    );

    Matches.associate = models => {
        Matches.belongsTo(models.tourneys, { as: 'tourney' });
    }

    return Matches;
}