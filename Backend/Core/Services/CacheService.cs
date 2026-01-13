using Core.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace Core.Services
{
    public class CacheService : ICacheService
    {
        private readonly IMemoryCache _cache;

        public CacheService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> factory, TimeSpan ttl)
        {
            if (_cache.TryGetValue(key, out T value))
                return value!;

            value = await factory();
            _cache.Set(key, value, ttl);
            return value;
        }

        public void Remove(string key)
        {
            _cache.Remove(key);
        }
    }
}
