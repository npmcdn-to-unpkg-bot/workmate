.PHONY: docs test

docs:
	cd docs; make html
	open docs/_build/html/index.html

test:
	coverage erase
	coverage run --branch --source=workmate `which django-admin.py` test
	coverage combine
	coverage html
	coverage report
