const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Asegúrate de que el modelo de usuario esté correctamente importado
User.hasMany(sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'email'
        }
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'tbl_post',
    timestamps: false
}), { foreignKey: 'email' });
(sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'email'
        }
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'tbl_post',
    timestamps: false
})).belongsTo(User, { foreignKey: 'email' });
module.exports = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'email'
        }
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'tbl_post',
    timestamps: false
});
//# sourceMappingURL=postModelo.js.map