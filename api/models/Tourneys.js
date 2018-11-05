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
        Tourneys.hasMany(models.Users, {
            foreignKey: {
                as: 'players',
                allowNull: false
            }
        });
        Tourneys.hasOne(models.Users, {
            foreignKey: {
                as: 'manager',
                allowNull: false
            }
        });
        Tourneys.hasMany(models.Rounds, {
            foreignKey: {
                as: 'roundNum',
                allowNull: false
            }
        })
    }

    return Tourneys;
}