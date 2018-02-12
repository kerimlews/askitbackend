const sequelize = require('sequelize');

const Questions = {
    id: { 
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: sequelize.TEXT,
        allowNull: false
    }
}

module.exports = Questions;