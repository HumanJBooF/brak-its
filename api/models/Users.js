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
        deleted: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
    Users.associate = models => {
        Users.hasOne(models.rounds, {
            as: 'player1',
            foreignKey: 'player_one'
        });
        Users.hasOne(models.rounds, {
            as: 'player2',
            foreignKey: 'player_two'
        });
    }
    return Users;
}
