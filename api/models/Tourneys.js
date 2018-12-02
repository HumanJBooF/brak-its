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
        actualSize: { type: DataTypes.INTEGER, defaultValue: 0 },
        sizeLimit: { type: DataTypes.INTEGER },
        format: { type: DataTypes.STRING, defaultValue: 'Single-elim' },
        gameType: { type: DataTypes.STRING },
        owner: { type: DataTypes.STRING },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
        time: { type: DataTypes.STRING }
    },
        { paranoid: true }
    );

    Tourneys.associate = models => {
        Tourneys.belongsToMany(models.users, { through: "signUp", onDelete: 'CASCADE' });
        Tourneys.hasMany(models.match, { as: 'tourneys' })
    }

    return Tourneys;
}