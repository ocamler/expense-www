restart:
	echo c > /tmp/uwsgi.fifo
restart-all:
	sudo service nginx restart
	echo c > /tmp/uwsgi.fifo
# NOTE: the best way to set up the app is using
#       Ansible playbooks in deploy/
old-setup:
	sudo npm install -g grunt-cli
	npm install
	mkdir -p logs
	python generate_setup.py
compile:
	grunt
compile-debug:
	grunt -v
compile-prod:
	NODE_ENV=production grunt compile:min
