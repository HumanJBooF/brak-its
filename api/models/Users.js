const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true }
        },
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    },
        { paranoid: true }
    );
    Users.associate = models => {
        Users.belongsToMany(models.tourneys, { through: "signUp", onDelete: 'CASCADE' });
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
