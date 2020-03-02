const
  { createQueryCacheInterceptor } = require('slonik-interceptor-query-cache'),
  { promisify } = require('util');


function slonikRedisCache(client, opts = {}) {
  const prefix = opts.prefix || 'slonik';
  const queryHashFn = opts.queryHashFn || ((q) => JSON.stringify(q));
  let redisCache = {
    getCache : promisify(client.get).bind(client),
    setCache : promisify(client.setex).bind(client),
  }
  return createQueryCacheInterceptor({
    storage: {
      get: (query) => redisCache.getCache(prefix+queryHashFn(query)).then(
        (response) => (response === null) ? null : JSON.parse(response)
      ),
      set: (query, cacheAttributes, queryResult) => redisCache
        .setCache(prefix+queryHashFn(query), cacheAttributes.ttl, JSON.stringify(queryResult))
    },
  });
}
module.exports = slonikRedisCache;