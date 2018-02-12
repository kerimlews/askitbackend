// Modules

const config = require('../../Infrastructure/Middlewares/customMiddleware');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Variables

const router = config.router;
const IAnswers = require('../../DataContext/Schemas/Answers/IAnswers');

// Requests

router.get('/allanswers', (req, res) => {
    IAnswers.getAllAnswers()
        .then(r => res.json(r))
});

router.post('/saveUserAnswer', passport.authenticate('jwt', { session: false }), (req, res) => {
    IAnswers.saveUserAnswer(req.body.userId, req.body.answerId, req.body.like)
        .then(r => res.json(r))
});

router.post('/saveAnswer', passport.authenticate('jwt', { session: false }), (req, res) => {
    IAnswers.saveAnswer(req.body.answer)
        .then(r => res.json(r))
});

module.exports = router;