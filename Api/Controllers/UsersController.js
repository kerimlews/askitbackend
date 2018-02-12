// Modules

const config = require('../../Infrastructure/Middlewares/customMiddleware');
const bcrypt = require('bcryptjs');
const sequalizers = require('../../Infrastructure/DbConnection/index');
const passport = require('passport');

// Variables

const router = config.router;
const users = sequalizers.userSequelize;
const Op = sequalizers.sequelize.Op;
const jwt = require('jsonwebtoken');

// Repository

const IUsers = require('../../DataContext/Schemas/Users/IUsers');

// Requests

// koristi
router.get('/userAnswers', (req, res) => {
    IUsers.findUsersWithMostAnswers()
        .then(r => res.json(r));
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    users.findOne({ where: {
        username: {
            [Op.like]: username
        }
        }})
        .then((user) => {
            bcrypt.compare(password, user.get('password'), (err, isMatch) => {
                if(isMatch) {
                    const token = jwt.sign(user.get(), 'secret', {
                        expiresIn: 60400
                    })
                    res.json({
                        success: true,
                        id: user.get('id'),
                        username: user.get('username'),
                        email: user.get('email'),
                        token: token
                        });
                    } else {
                        res.json({
                            success: false,
                            message: 'Wrong password'
                        });
                    }
                })
        })
        .catch((er) => {
            res.json({
                success: false,
                message: 'Username not found'
            });
        })
});

router.post('/registration', (req, res) => {
    let password = req.body.password
    users.findOne({ 
            where: {
                'username': {
                        [Op.like]: req.body.username
                    }
            }
        }).then((r) => {
            if (r == null) throw r;
            res.json({
                success: false,
                message: 'Username already exist'
            });
        }).catch(() => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) res.json(err);
                    let newUser = {
                        username: req.body.username,
                        password: hash,
                        createdAt: Date.now(),
                        email: req.body.email
                    };
                    users.insertOrUpdate(newUser)
                    .then((response) => {
                        res.json({
                            success: true
                        });
                    }).catch(() => {
                        res.json({
                            success: false,
                            message: 'Something went wrong. Please try again. !'
                        });
                    })
                });
            });
        })
    
});

router.post('/savePassword',passport.authenticate('jwt', { session: false }), (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
                IUsers.savePassword(req.body.id, hash)
                .then(r => res.json(r));
        });
    });
});

module.exports = router;