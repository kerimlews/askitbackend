
// Modules 

const config = require('../../Infrastructure/Middlewares/customMiddleware');
const router = config.router;

// Routers

const questions = require('../../Api/Controllers/QuestionsController');
const users = require('../../Api/Controllers/UsersController');
const home = require('../../Api/Controllers/HomeController');
const answers = require('../../Api/Controllers/AnswersController');

// RoutePerfix

router.use('/answers', answers);
router.use('/home', home);
router.use('/questions', questions);
router.use('/users', users);

module.exports = router;