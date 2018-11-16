module.exports = (sequelize, DataTypes) => {
    const Tourneys = sequelize.define('tourneys', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        tourneyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,

        },
        time: {
            type: DataTypes.TIME,

        },
        size: {
            type: DataTypes.INTEGER,
        },
        format: {
            type: DataTypes.STRING,
            default: 'single-elim'
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    }, {
            paranoid: true
        });
    Tourneys.associate = models => {
        Tourneys.hasMany(models.users, {
            as: 'tourneyId',
            foreignKey: 'tourney'
        });
    }

    return Tourneys;
}