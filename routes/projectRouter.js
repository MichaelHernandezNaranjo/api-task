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
      next(err);
    }
  });

  /* GET ID project */
  router.get('/:id',auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await projectService.get(req.params.id));
    } catch (err) {
      console.error(`Error al leer project`, err.message);
      next(err);
    }
  });

/* POST project */
router.post('/', async function(req, res, next) {
    try {
      var entitie = {
        name:req.body.name,
        description:req.body.description,
        active:req.body.active,
        createDate:new Date()
      };
      var projectId = await projectService.create(entitie);
      if(projectId > 0){
        res.json(await projectService.get(projectId));
      }else{
        console.error(`Error al crear project`);
      }
    } catch (err) {
      console.error(`Error al crear project`, err.message);
      next(err);
    }
  });

  /* PUT project */
  router.put('/:id', async function(req, res, next) {
    try {
      res.json(await projectService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error al actulizar project`, err.message);
      next(err);
    }
  });

  /* DELETE project */
  router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await projectService.remove(req.params.id));
    } catch (err) {
      console.error(`Error al borrar project`, err.message);
      next(err);
    }
  });

module.exports = router;