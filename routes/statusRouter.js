const express = require('express');
const router = express.Router();

const auth = require('../utilities/auth');
const statusService = require('../services/statusService');

/* GET ALL status */
router.get('/:projectId', auth.verifyToken , async function(req, res, next) {
    try {
      res.json(await statusService.getAll(req.query.projectId, req.query.page, req.query.search));
    } catch (err) {
      console.error(`Error al leer status`, err.message);
      next(err);
    }
  });

  /* GET ID status */
  router.get('/:projectId/:statusId',auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await statusService.get(req.params.projectId,req.params.statusId));
    } catch (err) {
      console.error(`Error al leer status`, err.message);
      next(err);
    }
  });

/* POST status */
router.post('/', async function(req, res, next) {
    try {
      var entitie = {
        projectId:req.body.projectId,
        name:req.body.name,
        active:req.body.active,
        createDate:new Date()
      };
      var statusId = await statusService.create(entitie);
      if(statusId > 0){
        res.json(await statusService.get(req.body.projectId,statusId));
      }else{
        console.error(`Error al crear status`);
      }
    } catch (err) {
      console.error(`Error al crear status`, err.message);
      next(err);
    }
  });

  /* PUT status */
  router.put('/:projectId/:statusId', async function(req, res, next) {
    try {
      res.json(await statusService.update(req.params.projectId, req.params.statusId, req.body));
    } catch (err) {
      console.error(`Error al actulizar status`, err.message);
      next(err);
    }
  });

  /* DELETE status */
  router.delete('/:projectId/:statusId', async function(req, res, next) {
    try {
      res.json(await statusService.remove(req.params.projectId, req.params.statusId));
    } catch (err) {
      console.error(`Error al borrar status`, err.message);
      next(err);
    }
  });

module.exports = router;