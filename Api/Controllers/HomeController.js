// Modules
const config = require('../../Infrastructure/Middlewares/customMiddleware');
const jwt = require('jsonwebtoken');

// Variables

const router = config.router;

// Requests

router.post('/verifyToken', (req, res) => {
    let token = req.body.token;
    jwt.verify(token,'secret', (err, decode) => {
        if(err) {
            res.json({
                isAuthenticated: false
            });
        } else {
            res.json({
                isAuthenticated: true,
                id: decode.id,
                username: decode.username,
                email: decode.email
            });
        }
    })
})

module.exports = router;