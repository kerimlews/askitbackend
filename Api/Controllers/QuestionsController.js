// Modules

const config = require('../../Infrastructure/Middlewares/customMiddleware');
const passport = require('passport');
const sequelize = require('sequelize');

// Variables

const IQuerstions = require('../../DataContext/Schemas/Questions/IQuestions');
const router = config.router;

// Requests

router.get('/allquestions', (req, res) => {
    IQuerstions.getAllQuestions()
        .then(r => res.json(r));
});

router.post('/myquestions',passport.authenticate('jwt', { session: false }), (req, res) => {
    IQuerstions.myQuestions(req.body.id, req.body.loadcount)
        .then(r => res.json(r));
});

router.post('/latest', (req, res) => {
    IQuerstions.getLatestQuestions(req.body.loadcount)
        .then(r => res.json(r));
});

router.get('/mostlikesquestions', (req, res) => {
    IQuerstions.getQuestionsWithMostLikes()
        .then(r => res.json(r));
});

router.post('/saveUserQuestion', passport.authenticate('jwt', { session: false }), (req, res) => {
    IQuerstions.saveUserQuestion(req.body.userId, req.body.questionId, req.body.like)
        .then(r => res.json(r));
})

router.post('/saveQuestion', passport.authenticate('jwt', { session: false }), (req, res) => {
    IQuerstions.saveQuestion(req.body)
        .then(r => res.json(r));
})

module.exports = router;