const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT id, name
      FROM company LIMIT ?,?`, 
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }
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
    getMultiple,
    create,
    update,
    remove
  }