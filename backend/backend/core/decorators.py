from django.core.cache import cache
from urllib.parse import quote


def memoize(timeout=None):
    def decorator_func(func):
        def _get_cache_key(*args, **kwargs):
            func_name = func.__name__
            args_str = '_'.join(quote(str(arg)) for arg in args)
            kwargs_str = '_'.join(
                f'{quote(key)}={quote(str(value))}' for key, value in sorted(kwargs.items())
            )
            
            cache_key = func_name

            if args_str:
                cache_key += f'__{args_str}'
            if kwargs_str:
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
