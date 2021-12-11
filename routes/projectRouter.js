const express = require('express');
const router = express.Router();

const auth = require('../utilities/auth');
const projectService = require('../services/projectService');

/* GET ALL project */
router.get('/', auth.verifyToken , async function(req, res, next) {
    try {
      res.json(await projectService.getAll(req.query.page, req.query.search));
    } catch (err) {
      console.error(`Error al leer project`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* GET ID project */
  router.get('/:id', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await projectService.get(req.params.id));
    } catch (err) {
      console.error(`Error al leer project`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

/* POST project */
router.post('/', auth.verifyToken, async function(req, res, next) {
    try {

      var dataToken =  auth.dataToken(req.token);
      if(!dataToken.status){
        res.status(401).json({'error':dataToken.error})
      }

      var entitie = {
        name:req.body.name,
        description:req.body.description,
        active:req.body.active,
        createDate:new Date(),
        createUserId: dataToken.data.user.userId
      };
      var projectId = await projectService.create(entitie);
      if(projectId > 0){
        res.json(await projectService.get(projectId));
      }else{
        console.error(`Error al crear project`);
        res.status(400).json({'message':'Error al crear project'});
      }
    } catch (err) {
      console.error(`Error al crear project`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* PUT project */
  router.put('/:id', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await projectService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error al actulizar project`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* DELETE project */
  router.delete('/:id', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await projectService.remove(req.params.id));
    } catch (err) {
      console.error(`Error al borrar project`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

module.exports = router;