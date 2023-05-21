test: ## Run unit tests
	@yarn test

run-dev: ## Run docker-compose
	@docker-compose up --build -d

stop-dev: ## Stop docker-compose
	@docker-compose down

lint: ## Run lint
	@yarn lint

fix-lint: ## Run fix lint
	@yarn lint:fix

help: ## Display available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
