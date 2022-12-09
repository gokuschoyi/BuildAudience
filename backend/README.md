## Celery Beat
celery -A tasks.celery_tasks:app beat --loglevel=DEBUG

## Celery Worker
-A tasks.celery_tasks:app worker --loglevel=DEBUG