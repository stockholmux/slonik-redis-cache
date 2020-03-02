# Slonik-redis-cache

Declarative caching for PostgreSQL with redis

# Background

Gajus Kuizinas wrote a [post on dev.to called "A declarative way to cache PostgreSQL queries using Node.js"](https://dev.to/gajus/a-declarative-way-to-cache-postgresql-queries-using-node-js-4fbo) that outlined a great pattern for caching with the [Slonik PostgreSQL client library](https://github.com/gajus/slonik). This is an implementation of that pattern that caches not with a local cache but with [Redis](http://redis.io). 


# Install
```
npm install slonik-redis-cache
```

# Options


| Option | Description |
| -------|------ |
| prefix | Any string. This will be added to the begining of the Redis key. Defaults to `slonik`. |
| queryHashFn | A function that accepts only one string argument. This will be used to convert the Postgres query into a Redis-friendly. String.

# Example

```
const  
  { sql, createPool } = require('slonik'),
  redis = require('redis'),
  redisCache = require('slonik-redis-cache'),
  client = redis.createClient({ ...your connection options...});

const pool = createPool(
  'postgres://localhost:5432/testdb', {
    interceptors: [
      redisCache(client)
    ]
});

pool.connect(async (connection) => {
  let results = await connection.query(sql`SELECT * FROM aTable -- @cache-ttl 10`);
  console.log(results);
});

```