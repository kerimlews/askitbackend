
// Modules

const sequelizers = require('../../../Infrastructure/DbConnection/index');
const sequelize = require('sequelize');

//Variables

const users = sequelizers.userSequelize;
const answers = sequelizers.answerSequelize;
const questions = sequelizers.questionsSequelize;
const user_answer = sequelizers.user_answersSequelize;
const Op = sequelize.Op;


// Functions

module.exports.getAllAnswers = (user_id) => {
    return answers.findAll({
        include: [{
            attributes: ['question'],
            model: questions
        },
        {
            attributes: ['username'],
            model: users
        },
        {
            model: user_answer,
            include: [{
                attributes:['username'],
                model: users
            }]
        }],
        order: [['createdAt', 'DESC']]
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

module.exports.saveAnswer = (model) => {
    console.log(model)
    return answers.create({
            'answer': model.answer,
            'question_id': model.questionId,
            'user_id': model.userId,
            'createdAt': Date.now(),
            'updatedAt': Date.now()
        })
        .then((response) => ({
            success: true,
            data: response
        }))
        .catch(() => ({
            success: false,
            message: 'Error while saving data ! Please try again later.'
    }))
}

module.exports.saveUserAnswer = (userId, answerId, like) => {
    return user_answer.insertOrUpdate({
        'user_id': userId,
        'answer_id': answerId,
        'isLike': like
        }).then((response) => ({
                success: true
        })).catch(() => ({
            success: false,
            message: 'Error while saving data ! Please try again later.'
        }))
    
}