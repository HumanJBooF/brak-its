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
        SignUp.hasMany(models.match, { foreignKey: 'player1Id' })
        SignUp.hasMany(models.match, { foreignKey: 'player2Id' })
    }
    return SignUp;
}