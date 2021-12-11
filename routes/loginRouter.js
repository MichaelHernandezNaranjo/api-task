const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();

const config = require('../config');
const auth = require('../utilities/auth');
const loginService = require('../services/loginService');

/* POST auth */
router.post('/', async function(req, res, next) {
    try {
      var _res = await loginService.login(req.body);
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

  router.post("/verifyToken", auth.verifyToken, (req , res) => {
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


module.exports = router;