// Modules 

const sequalizers = require('../../../Infrastructure/DbConnection/index');
const utils = require('../../../Services/Utils/util');
const sequelize = require('sequelize');

// Variables

const Op = sequalizers.sequelize.Op;
const users = sequalizers.userSequelize;
const answers = sequalizers.answerSequelize;
const user_answer = sequalizers.user_answersSequelize;
const user_question = sequalizers.user_questionSequelize;
const User = require('./Users');

// Functions 

module.exports.findUsersWithMostAnswers = (req, res) => {
    return users.findAll({
        attributes:['id','username',[sequelize.fn('count', sequelize.col('*')), 'answercount']],
        include: [{
                attributes: [],
                required: true,
                model: user_answer,
            }],
        order: [[sequelize.col('answercount'),'DESC']],
        group: 'id'
        })
        .then((response) => ({
            success: true,
            data: response
        }))
        .catch(() => ({
            success: false,
            message: 'Error while loading data ! Please try again later.'
        }))
}

module.exports.savePassword = (id, password) => {
    return users.update(
        { password: password },
        {
            fields: ['password'],
            where: {'id': id}
        })
        .then((response) => ({
            success: true,
            message: 'Password has changed'
        }))
        .catch(() => ({
            success: false,
            message: 'Error while saving data ! Please try again later.'
        }));
}