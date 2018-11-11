module.exports = (sequelize, DataTypes) => {
    const Tourneys = sequelize.define('tourneys', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        format: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner: {
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