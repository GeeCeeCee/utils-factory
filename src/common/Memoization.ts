export function memoizeSync<K extends bigint | number | string, V>(
  fun: (key: K) => V
) {
  const cache = new Map<K, V>();
  return function (key: K): V {
    if (cache.has(key)) {
      return cache.get(key) as V;
    }
    const value = fun(key);
    cache.set(key, value);
    return value;
  };
}
export function memoizeAsync<K extends bigint | number | string, V>(
  fun: (key: K) => Promise<V>
) {
  const cache = new Map<K, V>();
  return async function (key: K): Promise<V> {
    if (cache.has(key)) {
      return cache.get(key) as V;
    }
    const value = await fun(key);
    cache.set(key, value);
    return value;
  };
}
export const Memoize = { async: memoizeAsync, sync: memoizeSync } as const;
