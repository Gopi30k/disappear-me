from app import factory
import app
import os

app = factory.create_app(celery=app.celery)
port = int(os.environ.get('PORT', 5000))
app.run(host='0.0.0.0', port=port)
