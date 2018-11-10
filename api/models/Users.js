const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        // UUID: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
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

    Users.prototype.validPassword = function (password) {
    	return bcrypt.compareSync(password, this.password);
    };

    Users.hook("beforeCreate", (users) => {
        const saltRounds = Math.floor(Math.random() * 6 + 13);
    	users.password = bcrypt.hashSync(users.password, bcrypt.genSaltSync(saltRounds), null);
    });

    return Users;
}
