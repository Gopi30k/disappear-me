from .models import Task, TaskExtended, User, TaskSet
from .factory import db
from app import celery
import time


@celery.task(bind=True)
def timer_task(self, input_vals):
    if input_vals is not None:
        ttl = input_vals['ttl']['ttl_seconds']
        while ttl > 0:
            ttl = ttl-1
            time.sleep(1)
            self.update_state(state='PROGRESS',
                              meta={
                                  'content': input_vals['content'],
                                  'type': input_vals['type'],
                                  'ttl': ttl,
                                  'time': input_vals['ttl']['time']
                              })
        return {"content": input_vals['content'],
                "type": input_vals['type'],
                "ttl": ttl,
                "time": input_vals['ttl']['time']
                }
        # return dict(input_vals)
    else:
        return self.update_state(state='FAILURE', meta=None)
