module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'myuser',
    password: process.env.DB_PASS || 'mypassword',
    database: process.env.DB_NAME || 'mydatabase',
    synchronize: true, 
    logging: false,
    entities: ['src/entity/*.ts'], 
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  };
  