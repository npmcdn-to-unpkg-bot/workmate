TARGET?=tests

.PHONY: docs test migrations

docs:
	cd docs; make html
	open docs/_build/html/index.html

test:
	coverage erase
	DJANGO_SETTINGS_MODULE=tests.settings PYTHONPATH=. \
		coverage run --branch --source=workmate \
		`which django-admin.py` test ${TARGET}
	coverage combine
	coverage html
	coverage report

migrations:
	DJANGO_SETTINGS_MODULE=tests.settings PYTHONPATH=. \
		django-admin.py makemigrations workmate
