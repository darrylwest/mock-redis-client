install:
	@make npm
	@( [ -d logs ] || mkdir logs )

npm:
	@npm install

test:
	@grunt test

watch:
	@grunt server

.PHONY: install
.PHONY: npm
.PHONY: test
.PHONY: watch
.PHONY: browser
