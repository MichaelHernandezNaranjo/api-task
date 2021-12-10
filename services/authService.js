const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function auth(entitie){
  //console.log(encriptar(entitie.password));
    const rows = await db.query(
      `SELECT userId,email,userName
      FROM user WHERE active=1 and email=? and password=?;`,
      [entitie.email, encriptar(entitie.password)]
    );
    if(rows.length > 0){
      return rows[0];
    }else{
      return null;
    }
  }

  module.exports = {
    auth,
  }

  function encriptar(text) {
    var crypto = require('crypto')
    var hmac = crypto.createHmac('sha1', config.SecretKey).update(text).digest('hex')
    return hmac
 }