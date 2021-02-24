from app import celery
import time


@celery.task(bind=True)
def timer_task(self, input_vals):
    if input_vals is not None:
        while input_vals['ttl'] > 0:
            time.sleep(1)
            input_vals['ttl'] = input_vals['ttl']-1
            self.update_state(state='PROGRESS',
                              meta=input_vals)
        return self.update_state(state='SUCCESS',
                                 meta=input_vals)
    else:
        return self.update_state(state='FAILURE', meta=None)
