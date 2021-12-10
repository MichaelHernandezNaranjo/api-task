const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const jwt = require("jsonwebtoken");
const config = require('../config');

/* POST auth */
router.post('/', async function(req, res, next) {
    try {
      var _res = await authService.auth(req.body);
      if(_res != null){
        jwt.sign({"user":_res}, config.SecretKey, {expiresIn: '2 days'}, (err, token) => {
          res.json({
              token,
              user: {
                email:_res.email,
                userName:_res.userName
              }
          });
      });
      }else{
        res.status(404).json({'error':'usuario o/y contraseña incorrecto!'})
      }
    } catch (err) {
      res.status(500).json({'error':err.message})
    }
  });

  router.post("/verifyToken", verifyToken, (req , res) => {

    jwt.verify(req.token, config.SecretKey, (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                    mensaje: "Post fue creado",
                    authData
                });
        }
    });
});

// Authorization: Bearer <token>
function verifyToken(req, res, next){
     const bearerHeader =  req.headers['authorization'];

     if(typeof bearerHeader !== 'undefined'){
          const bearerToken = bearerHeader.split(" ")[1];
          req.token  = bearerToken;
          next();
     }else{
         res.sendStatus(403);
     }
}

module.exports = router;