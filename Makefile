# imports env vars
include .env

# .PHONY for targets will prevent make from confusing the phony target with a file name
.PHONY: = dev nuke prune_img prune_sys prune_vols remove_api stop

dev: ## run dev api & database in docker
	docker compose up dev

space := $(subst ,, )

ifeq (make_migration,$(firstword $(MAKECMDGOALS)))
  	MIGRATE_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  	$(eval $(MIGRATE_ARGS):;@:)
endif

NAME := $(subst $(space),_,$(MIGRATE_ARGS))

new_migration: ## runs knex migrations:make command; pass migration name after make command
	npm run migrate:make $(NAME)

migrate_dev: 
	DATABASE_URL=${DATABASE_URL} npm run migrate

migrate_prod: 
	DATABASE_URL=${DATABASE_URL} npm run migrate
	
nuke: # wipes out dev environment
	make stop
	make remove_api
	make prune_sys
	make prune_vols
	make dev

prod: ## run local production api & database in docker
	docker compose up api-local-prod

prune_img: ## run docker prune on all stopped/not in use images
	docker image prune

prune_sys: ## run docker prune for system (stopped containers, dead networks, unused images, build cache)
	docker system prune

prune_vols: ## run docker prune for volumes not in use by a container
	docker volume prune

remove_api: ## delete docker API image, by reference & formatting to pass ID into rmi cmd
	@docker rmi --force $$(docker images --filter=reference="groovebase-api-dev" --format="{{.ID}}")

seed_dev: ## run seeder for dev environment
	DATABASE_URL=${DATABASE_URL} knex seed:run

seed_prod: ## run seeder for dev environment
	DATABASE_URL=${DATABASE_URL} knex seed:run

setup_local_db: ## run migrations and seeds for local database
	make migrate_dev
	make seed_dev

setup_prod_db: ## run migrations and seeds for prod database
	make migrate_prod
	make seed_prod

stop:
	docker compose down