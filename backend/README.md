# DisappearMe

Backend Developer using Flask, PostgreSQL, Redis as message broker.

## Steps to setup local development environment

### Dependencies

```
Python 3.7+ is needed
```

### Installation

1.) Clone the Git repository in your local machine

```
git clone https://github.com/Gopi30k/disappear-me.git
```

2.) Move/Navigate to the backend directory

```
cd disappear-me/backend
```

3.) Use Python venv to create a virtual environment

```
python -m venv env
```

4.) Activate Virtual Environment

#### Windows

```
./env/Scripts/Activate
```

#### Linux/MacOS

```
source env/bin/activate
```

5.) Use the package manager [pip](https://pip.pypa.io/en/stable/) to install requirements.

```bash
pip install -r requirements.txt
```

6.) create .env file and enter Postgres Database and redis server details

```
CELERY_BACKEND_URI=db+postgresql://username:pwd@localhost/database
CELERY_BROKER_URI=redis://127.0.0.1:6379
```

7.) Run Celery

```
celery -A worker.celery worker --loglevel=info -P eventlet --autoscale=10,4
```

8.) Run Flower to monitor tasks

```
flower -A worker.celery --port=5555
```

9.) Run the Flask server

```bash
python run.py
```

10.) Server started

```bash
http://127.0.0.1:5000 - Flask
http://127.0.0.1:5555 - Flower Celery
```
