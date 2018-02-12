const sequelize = require('sequelize');

const Answers = {
	id: {
		type: sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	answer: {
		type: sequelize.STRING,
		allowNull: false
	}
}

module.exports = Answers;