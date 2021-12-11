const db = require('../utilities/db');
const helper = require('../helper');
const config = require('../config');
const sprintService = require('../services/sprintService');

async function getAll(projectId, page = 1, search = ''){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT projectId, taskId, sprintId, statusId, name, description, active, createDate, createUserId FROM task WHERE projectId=? and name LIKE ? OR description LIKE ? LIMIT ?,?;`,
      [projectId,'%' + search + '%','%' + search + '%', offset, config.listPerPage]
      );
      const rows2 = await db.query(
      `SELECT COUNT(*) count FROM task WHERE projectId=? and name LIKE ? OR description LIKE ?;`,
      [projectId, '%' + search + '%','%' + search + '%']
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page: parseInt(page), limit: config.listPerPage, count: helper.emptyOrRows(rows2)[0].count, search: search};
    return {
      data,
      meta
    };
  }

  async function get(projectId, taskId){
    const rows = await db.query(
      `SELECT projectId, taskId, sprintId, statusId, name, description, active, createDate, createUserId FROM task where projectId=? and taskId = ?`,
      [projectId, taskId]
    );
    var res = rows.map(x=> new {
      projectId: x.projectId,
      taskId: x.taskId,
      name: x.name
    })
    console.log(res);
    return rows[0];
  }

async function create(entitie){
    const res = await db.query(
      `INSERT INTO task
      (projectId,taskId,sprintId,statusId,name,description,active,createDate,createUserId)
      VALUES
      (?,(select isnull(max(taskId)) from task where projectId=?),?,?,?,?);
      `,
      [
        entitie.projectId,
        entitie.projectId,
        entitie.sprintId,
        entitie.statusId,
        entitie.name,
        entitie.description,
        entitie.active,
        entitie.createDate,
        entitie.createUserId
      ]
    );
    console.log(res);
    if (res.affectedRows) {
      return res.insertId;
    }
    return 0;
  }

  async function update(projectId,taskId, entitie){
    const result = await db.query(
      `UPDATE task
      SET sprintId=?,statusId=?,name=?,description=?,active=?
      WHERE projectId=? and taskId=?`,
      [
        entitie.sprintId,entitie.statusId,entitie.name, entitie.description, entitie.active, projectId, taskId
      ]
    );
    if (result.affectedRows) {
      return true;
    }
    return false;
  }

  async function remove(projectId, taskId){
    const result = await db.query(
      `DELETE FROM task WHERE projectId=? and taskId=?`, 
      [projectId,taskId]
    );
    if (result.affectedRows) {
      return true;
    }
    return false;
  }

  module.exports = {
    getAll,
    get,
    create,
    update,
    remove
  }