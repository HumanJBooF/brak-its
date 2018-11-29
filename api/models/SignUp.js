module.exports = (sequelize, DataTypes) => {
    const SignUp = sequelize.define('signUp', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    }
    );

    SignUp.associate = models => {
        SignUp.hasMany(models.matches, { foreignKey: 'player1' })
        SignUp.hasMany(models.matches, { foreignKey: 'player2' })
    }
    return SignUp;
}