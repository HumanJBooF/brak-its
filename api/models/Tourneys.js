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
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
    Tourneys.associate = models => {
        Tourneys.hasMany(models.users, {
            as: 'players',
            foreignKey: {
                allowNull: false
            }
        });
        Tourneys.hasOne(models.users, {
            as: 'manager',
            foreignKey: {
                allowNull: false
            }
        });
        Tourneys.hasMany(models.rounds, {
            as: 'roundNum',
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Tourneys;
}