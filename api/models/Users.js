module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        UUID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        saltrounds: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
    Users.associate = models => {
        Users.hasMany(models.rounds, {
            as: 'round_number',
            foreignKey: {
                allowNull: false
            }
        });
        // Users.hasMany(models.tourneys, {
        //     foreignKey: {
        //         as: 'tourney_name',
        //         allowNull: false
        //     }
        // })
    };
    return Users;
}