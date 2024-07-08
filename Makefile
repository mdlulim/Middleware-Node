all: server

.PHONY: server
server:
	cd $(CURDIR)/modules/server && $(MAKE)

.PHONY: dependencies
dependencies: dependencies-server

.PHONY: dependencies-server
dependencies-server:
	cd $(CURDIR)/packages/server && $(MAKE) dependencies
