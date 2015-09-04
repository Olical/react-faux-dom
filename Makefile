.PHONY: default bootstrap test test-watch

default: bootstrap test

bootstrap:
	@npm install

test:
	@npm test

test-watch:
	@./node_modules/.bin/nodemon --exec "npm test"
