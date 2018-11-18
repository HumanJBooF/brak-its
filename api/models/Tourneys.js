module.exports = (sequelize, DataTypes) => {
    const Tourneys = sequelize.define('tourneys', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        tourneyName: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING, allowNull: true },
        date: { type: DataTypes.DATE },
        time: { type: DataTypes.TIME },
        actualSize: { type: DataTypes.STRING },
        sizeLimit: { type: DataTypes.STRING },
        format: { type: DataTypes.STRING, defaultValue: 'single-elim' },
        gameType: { type: DataTypes.STRING },
        owner: { type: DataTypes.STRING },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
        { paranoid: true }
    );

    Tourneys.associate = models => {
        Tourneys.hasMany(models.users, { as: 'tourneyId', foreignKey: 'tourneys' });
    }

    return Tourneys;
}