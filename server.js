
// server.js
// importing express 
const express = require('express');
// creating express instance
const app = express();
 
// importing body-parser, which will handle the user input bodies
const bodyParser = require('body-parser');
 
// importing jsonwebtoken module, this module will create and decode the JWT tokens.
const jsonWebToken = require('jsonwebtoken');
 
app.use(bodyParser.json()); // only parses json data
app.use(bodyParser.urlencoded({ // handles the urlencoded bodies
    extended: true
}));
 
const myJWTSecretKey = 'qualquer key aqui'; 
 
app.get('/', (req, res) => {
    // Aqui pega um dado da base
    const user = {
        email: 'fernandofitilan@hotmail.com',
        id: 1,
        name: 'Fernando'
    };
    // sign with default (HMAC SHA256) 
    const token = jsonWebToken.sign(user, myJWTSecretKey);
    res.json({
        token: token
    });
});
 
// GET - http://localhost:3000/verifica/{token}
app.get('/verifica/:token', (req, res) => {
    try {
        const tokenDecodedData = jsonWebToken.verify(req.params.token, myJWTSecretKey);
        return res.json({
            error: false,
            data: tokenDecodedData
        });
    } catch (error) {
        res.json({
            error: true,
            data: error
        });
    }
})
 
app.listen(3000, () => {
    console.log(`serve rodando na porta 3000`);
});