from app import factory
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
import app
import os
from app.models import User, Task, TaskExtended, TaskSet

app = factory.create_app(celery=app.celery)
migrate = Migrate(app, factory.db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


@manager.command
def run():
    port = int(os.environ.get('PORT', 5000))
    # app.run(host='0.0.0.0', port=port)
    app.run(port=port, debug=True)


if __name__ == '__main__':
    manager.run()
