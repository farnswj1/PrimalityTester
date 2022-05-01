from django.core.cache import cache
from urllib.parse import quote


def memoize(timeout=None):
    def decorator_func(func):
        def _get_cache_key(*args, **kwargs):
            module = func.__module__
            name = func.__name__
            cache_key = f'{module}.{name}' if module else name

            if args:
                args_str = quote('_'.join(map(str, args)))
                cache_key += f'__{args_str}'

            if kwargs:
                kwargs_str = quote(
                    '_'.join(f'{key}={value}' for key, value in sorted(kwargs.items()))
                )
                cache_key += f'__{kwargs_str}'

            return cache_key

        def wrapper(*args, **kwargs):
            cache_key = _get_cache_key(*args, **kwargs)
            result = cache.get(cache_key)

            if result is None:
                result = func(*args, **kwargs)
                cache.set(cache_key, result, timeout)
            
            return result
        return wrapper
    return decorator_func
