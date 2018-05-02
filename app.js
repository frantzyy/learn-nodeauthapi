const express  = require('express');
const jwt = require('jsonwebtoken');

const app = express();


app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the api chris'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        
        console.log(err);

        if(err){
            res.sendStatus(403);

        }else{
            res.json({
                message: 'Post created',
                authData
            });
        }
    });
   
});


app.post('/api/login', (req, res) => {

    //mock user
    const user = {
        id: 'n0107106',
        username: 'cfrantz',
        email: 'christopher.frantz@libertymutual.com'
    }

    //https://github.com/auth0/node-jsonwebtoken
    jwt.sign({user}, 'secretkey', {expiresIn: '1d'}, (err, token) => {
        res.json({
            token
        });
    });
});



// verifyToken
// format of token..
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {

    //Get auth header value
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();

    }else {
        res.sendStatus(403);
    }
    
}

app.listen(5000, () => console.log('Server started on port 5000'));