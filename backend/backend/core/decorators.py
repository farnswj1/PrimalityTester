from django.core.cache import cache
from urllib.parse import quote


def memoize(timeout=None):
    def decorator_func(func):
        def _get_cache_key(*args, **kwargs):
            cache_key = func.__name__

            if args:
                args_str = '_'.join(quote(str(arg)) for arg in args)
                cache_key += f'__{args_str}'

            if kwargs:
                kwargs_str = '_'.join(
                    quote(f'{key}={value}') for key, value in sorted(kwargs.items())
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
