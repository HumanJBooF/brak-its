module.exports = (sequelize, DataTypes) => {
    const Rounds = sequelize.define('rounds', {
        p1_score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        p2_score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        winner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        round_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        next_round: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
    Rounds.associate = models => {
        Rounds.hasMany(models.Users, {
            foreignKey: {
                as: 'player_one',
                allowNull: false
            }
        });
        Rounds.hasMany(models.Users, {
            foreignKey: {
                as: 'player_two',
                allowNull: false
            }
        });
        Rounds.hasMany(models.Tourney, {
            foreignKey: {
                as: 'tourney_name',
                allowNull: false
            }
        });
    }

    return Rounds;
}