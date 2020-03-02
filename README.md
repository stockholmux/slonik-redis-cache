# Slonik-redis-cache

Declarative caching for PostgreSQL with redis

# Background

Gajus Kuizinas wrote a [post on dev.to called "A declarative way to cache PostgreSQL queries using Node.js"](https://dev.to/gajus/a-declarative-way-to-cache-postgresql-queries-using-node-js-4fbo) that outlined a great pattern for caching with the [Slonik PostgreSQL client library](https://github.com/gajus/slonik). This is an implementation of that pattern that caches not with a local cache but with [Redis](http://redis.io). 
