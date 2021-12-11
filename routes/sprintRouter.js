const express = require('express');
const router = express.Router();

const auth = require('../utilities/auth');
const sprintService = require('../services/sprintService');

/* GET ALL sprint */
router.get('/:projectId', auth.verifyToken , async function(req, res, next) {
    try {
      res.json(await sprintService.getAll(req.query.projectId, req.query.page, req.query.search));
    } catch (err) {
      console.error(`Error al leer sprint`, err.message);
      next(err);
    }
  });

  /* GET ID sprint */
  router.get('/:projectId/:sprintId',auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await sprintService.get(req.params.projectId,req.params.sprintId));
    } catch (err) {
      console.error(`Error al leer sprint`, err.message);
      next(err);
    }
  });

/* POST sprint */
router.post('/', async function(req, res, next) {
    try {
      var entitie = {
        projectId:req.body.projectId,
        name:req.body.name,
        description:req.body.description,
        active:req.body.active,
        createDate:new Date()
      };
      var sprintId = await sprintService.create(entitie);
      if(sprintId > 0){
        res.json(await sprintService.get(req.body.projectId,sprintId));
      }else{
        console.error(`Error al crear sprint`);
      }
    } catch (err) {
      console.error(`Error al crear sprint`, err.message);
      next(err);
    }
  });

  /* PUT sprint */
  router.put('/:projectId/:sprintId', async function(req, res, next) {
    try {
      res.json(await sprintService.update(req.params.projectId, req.params.sprintId, req.body));
    } catch (err) {
      console.error(`Error al actulizar sprint`, err.message);
      next(err);
    }
  });

  /* DELETE sprint */
  router.delete('/:projectId/:sprintId', async function(req, res, next) {
    try {
      res.json(await sprintService.remove(req.params.projectId, req.params.sprintId));
    } catch (err) {
      console.error(`Error al borrar sprint`, err.message);
      next(err);
    }
  });

module.exports = router;