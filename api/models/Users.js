const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    },
        { paranoid: true }
    );
    Users.associate = models => {
        Users.hasOne(models.matches, { as: 'player1', foreignKey: 'playerOne' });
        Users.hasOne(models.matches, { as: 'player2', foreignKey: 'playerTwo' });
    }

    Users.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    Users.addHook("beforeCreate", (users) => {
        const saltRounds = 12;
        users.password = bcrypt.hashSync(users.password, bcrypt.genSaltSync(saltRounds), null);
    });

    return Users;
}
