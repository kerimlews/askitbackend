var sequelize = require('sequelize');

const User_Question = {
    id: {
		type: sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
    isLike: sequelize.ENUM('Yes', 'No')
}

module.exports = User_Question;