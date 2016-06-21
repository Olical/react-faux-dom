.PHONY: default bootstrap test test-watch build

bin = ./node_modules/.bin

default: bootstrap test

bootstrap:
	npm install

test:
	npm test

test-watch:
	./node_modules/.bin/nodemon --exec "npm test"

build:
	$(bin)/bastion -e ./lib/ReactFauxDOM.js -b ./dist/ReactFauxDOM.min.js
