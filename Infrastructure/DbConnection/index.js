const Sequelize = require('sequelize');

// Models
const Users = require('../../DataContext/Schemas/Users/Users');
const Questions = require('../../DataContext/Schemas/Questions/Questions');
const Answers = require('../../DataContext/Schemas/Answers/Answers');;

const User_Question = require('../../DataContext/Schemas/Relations/User_Question');
const User_Answer = require('../../DataContext/Schemas/Relations/User_Answer');

// Connect to database

const sequelize = new Sequelize('AskIt', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

// Define sequelize variable 

const questionsSequelize = sequelize.define('questions', Questions)
const userSequelize = sequelize.define('users', Users);
const answerSequelize = sequelize.define('answers', Answers);

const user_answersSequelize = sequelize.define('user_answer', User_Answer, { timestamps: false,
  indexes:[{ unique: true, fields: ['user_id', 'answer_id'] }], tableName: 'user_answer'});
const user_questionSequelize = sequelize.define('user_question', User_Question, { timestamps: false,
  indexes:[{ unique: true, fields: ['user_id', 'question_id'] }], tableName: 'user_question'});

// Migrations
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Define relations

    // user-questions

    userSequelize.hasMany(user_questionSequelize, { foreignKey: 'user_id' });
    user_questionSequelize.belongsTo(userSequelize, { foreignKey: 'user_id' });

    questionsSequelize.belongsTo(userSequelize, { foreignKey: 'user_id' });

    questionsSequelize.hasMany(user_questionSequelize, { foreignKey: 'question_id' })
    user_questionSequelize.belongsTo(questionsSequelize, { foreignKey: 'question_id' });

    // user-answers
  
    userSequelize.hasMany(user_answersSequelize,  { foreignKey: 'user_id' });
    user_answersSequelize.belongsTo(userSequelize, { foreignKey: 'user_id' });

    answerSequelize.belongsTo(userSequelize, { foreignKey: 'user_id' });

    answerSequelize.hasMany(user_answersSequelize, { foreignKey: 'answer_id' });
    user_answersSequelize.belongsTo(answerSequelize, { foreignKey: 'answer_id' });

    // answer-questions

    questionsSequelize.hasMany(answerSequelize, { foreignKey: 'question_id' })
    answerSequelize.belongsTo(questionsSequelize, { foreignKey: 'question_id' }); 
   
    // Drop database then make again cause foreingKey

    // Import tables 
    //sequelize.sync();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Export
module.exports = {
  sequelize,
  userSequelize,
  answerSequelize,
  questionsSequelize,
  user_questionSequelize,
  user_answersSequelize
};
