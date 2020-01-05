

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
 

const jsonWebToken = require('jsonwebtoken');
 
app.use(bodyParser.json()); // only parses json data
app.use(bodyParser.urlencoded({ // handles the urlencoded bodies
    extended: true
}));
 
const myJWTSecretKey = 'qualquer key aqui'; 
 
app.get('/', (req, res) => {
   
    const user = {
        email: 'fernandofitilan@hotmail.com',
        id: 1,
        name: 'Fernando'
    };
    
    const token = jsonWebToken.sign(user, myJWTSecretKey);
    res.json({
        token: token
    });
});
 

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
