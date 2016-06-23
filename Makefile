restart:
	echo c > /tmp/uwsgi.fifo
restart_all:
	sudo service nginx restart
	echo c > /tmp/uwsgi.fifo
setup:
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
