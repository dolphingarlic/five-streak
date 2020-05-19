release: python five-streak/manage.py migrate; python five-streak manage.py collectstatic --noinput
web: cd five-streak; gunicorn five-streak.wsgi --log-file -