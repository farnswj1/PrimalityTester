worker_class = 'uvicorn.workers.UvicornWorker'
workers = 2
bind = '0.0.0.0:8000'
forwarded_allow_ips = '*'
accesslog = '-'
