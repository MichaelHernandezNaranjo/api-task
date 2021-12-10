const express = require('express');
const router = express.Router();
const companyService = require('../services/company');

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

/* GET ALL company */
router.get('/',verifyToken, async function(req, res, next) {
    try {
      res.json(await companyService.getAll(req.query.page));
    } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
    }
  });

  /* GET ID company */
  router.get('/:id',verifyToken, async function(req, res, next) {
    try {
      res.json(await companyService.get(req.params.id));
    } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
    }
  });

/* POST company */
router.post('/', async function(req, res, next) {
    try {
      res.json(await companyService.create(req.body));
    } catch (err) {
      console.error(`Error while creating programming language`, err.message);
      next(err);
    }
  });
  
  /* PUT company */
  router.put('/:id', async function(req, res, next) {
    try {
      res.json(await companyService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating programming language`, err.message);
      next(err);
    }
  });
  
  /* DELETE company */
  router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await companyService.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting programming language`, err.message);
      next(err);
    }
  });

module.exports = router;