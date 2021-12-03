const env = process.env;

const config = {
  db: { /* don’t expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || '127.0.0.1',
    user: env.DB_USER || 'api',
    password: env.DB_PASSWORD || '123456',
    database: env.DB_NAME || 'api',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};
module.exports = config;