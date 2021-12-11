const db = require('../utilities/db');
const helper = require('../helper');
const config = require('../config');

async function getAll(projectId, page = 1, search = ''){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT projectId, sprintId, name, description, active, createDate FROM sprint WHERE projectId=? and name LIKE ? OR description LIKE ? LIMIT ?,?;`,
      [projectId,'%' + search + '%','%' + search + '%', offset, config.listPerPage]
      );
      const rows2 = await db.query(
      `SELECT COUNT(*) count FROM sprint WHERE projectId=? and sprintName LIKE ? OR description LIKE ?;`,
      [projectId, '%' + search + '%','%' + search + '%']
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page: parseInt(page), limit: config.listPerPage, count: helper.emptyOrRows(rows2)[0].count, search: search};
    return {
      data,
      meta
    };
  }

  async function get(projectId, sprintId){
    const rows = await db.query(
      `SELECT projectId, sprintId, name, description, active, createDate FROM sprint where projectId=? and sprintId = ?`,
      [projectId, sprintId]
    );
    return rows[0];
  }

async function create(entitie){
    const res = await db.query(
      `INSERT INTO sprint
      (projectId,sprintId,name,description,active,createDate)
      VALUES
      (?,(select isnull(max(sprintId)) from sprint where projectId=?),?,?,?);
      `,
      [
        entitie.projectId,
        entitie.projectId,
        entitie.name,
        entitie.description,
        entitie.active,
        entitie.createDate
      ]
    );
    console.log(res);
    if (res.affectedRows) {
      return res.insertId;
    }
    return 0;
  }

  async function update(projectId,sprintId, entitie){
    const result = await db.query(
      `UPDATE sprint
      SET name=?,description=?,active=?
      WHERE projectId=? and sprintId=?`,
      [
        entitie.name, entitie.description, entitie.active, projectId, sprintId
      ]
    );
    if (result.affectedRows) {
      return true;
    }
    return false;
  }

  async function remove(projectId, sprintId){
    const result = await db.query(
      `DELETE FROM sprint WHERE projectId=? and sprintId=?`, 
      [projectId,sprintId]
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