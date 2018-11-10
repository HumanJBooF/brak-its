module.exports = (sequelize, DataTypes) => {
    const Tourneys = sequelize.define('tourneys', {
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