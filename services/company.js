const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT roleId, name
      FROM role LIMIT ?,?`, 
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
      data,
      meta
    }
  }

  async function get(id){
    const rows = await db.query(
      `SELECT roleId, name
      FROM role where roleId = ?`,
      [id]
    );
    return rows[0];
  }

async function create(entitie){
    const result = await db.query(
      `INSERT INTO company
      (name)
      VALUES
      (?)`,
      [
        entitie.name
      ]
    );
  
    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    return {message};
  }
  
  async function update(id, entitie){
    const result = await db.query(
      `UPDATE company 
      SET name=?
      WHERE id=?`, 
      [
        entitie.name, id
      ]
    );
  
    let message = 'Error in updating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language updated successfully';
    }
  
    return {message};
  }
  
  async function remove(id){
    const result = await db.query(
      `DELETE FROM company WHERE id=?`, 
      [id]
    );
  
    let message = 'Error in deleting programming language';
  
    if (result.affectedRows) {
      message = 'Programming language deleted successfully';
    }
  
    return {message};
  }

  module.exports = {
    getAll,
    get,
    create,
    update,
    remove
  }