// Modules

const sequelizers = require('../../../Infrastructure/DbConnection/index');
const sequelize = require('sequelize');

//Variables

const users = sequelizers.userSequelize;
const questions = sequelizers.questionsSequelize;
const user_question = sequelizers.user_questionSequelize;
const answers = sequelizers.answerSequelize;
const Op = sequelize.Op;


// Functions

module.exports.getLatestQuestions = (loadcount) => {
    var total = parseInt(loadcount, 10);
    return questions.findAll({
        include: [{
                attributes: ['username'],
                model: users
            },{
                model: answers,
                include: [{
                    attributes:['username'],
                    model: users
                }]
            }],
        limit: [total, 2],
        order: [['createdAt', 'DESC']]
        }).then((response) => ({
            success: true,
            data: response
        }))
        .catch(() => ({
            success: false,
            message: 'Error while loading data ! Please try again later.'
        }))
}

module.exports.myQuestions = (userId, loadcount, modelength) => {
    var total = parseInt(loadcount, 10);
    return questions.findAll({
        where: {
            'user_id': {
                [Op.eq]: userId
            }
        },
        include: [{
                model: user_question,
                include: [{
                    model: users
                }]
            },{
                model: answers,
                include: [{
                    model: users
                }]
            }],
        limit: [total, 2],
        order: [['createdAt', 'DESC']]
        }).then(response => ({
                success: true,
                data: response
        })).catch(() => ({
                success: false,
                message: 'Error while loading data ! Please try again later.'
    }));
}

module.exports.getQuestionsWithMostLikes = () => {
    return questions.findAll({
        attributes: ['id','question',[sequelize.fn('count', sequelize.col('*')), 'likecount']],
        include: [{
                attributes: [],
                model: user_question,
                where: {
                    isLike: {
                        [Op.like]: 'Yes%',
                    }
                },
            }],
        order: [[sequelize.col('likecount'), 'DESC']],
        group: 'question'
        }).then((response) => ({
                success: true,
                data: response
        })).catch(() => ({
                success: false,
                message: 'Error while loading data ! Please try again later.'
        }))
}

module.exports.getAllQuestions = () => {
    return questions.findAll({
            include: [
                {
                    attributes:['username'],
                    model: users
                },
                {
                    model: answers,
                    include: [{
                        attributes: ['username'],
                        model: users
                    }]
                },
                {
                    model: user_question,
                    include: [{
                        attributes: ['username'],
                        model: users
                    }]
                }
            ]
        })
        .then((response) => ({
            success: true,
            data: response
        }))
        .catch(() => ({
                success: false,
                message: 'Error while loading data ! Please try again later.'
            })
        );
}

module.exports.saveUserQuestion = (userId, questionId, like) => {
    return user_question.insertOrUpdate({
            'user_id': userId,
            'question_id': questionId,
            'isLike': like
        })
        .then(() => ({ success: true }))
        .catch(() => ({
                success: false,
                message: 'Error while saving data ! Please try again later.'
            })
        )
}

module.exports.saveQuestion = (model) => {
    console.log(model)
    return questions.create({
        'question': model.question,
        'user_id': model.userId,
        'createdAt': Date.now(),
        'updatedAt': Date.now()
    }).then(() => ({
        success: true
    }))
    .catch(() => ({
        success: false,
        message: 'Error while saving data ! Please try again later.'
    }))
}