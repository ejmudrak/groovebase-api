# .PHONY for targets will prevent make from confusing the phony target with a file name
.PHONY: = dev nuke prune_img prune_sys prune_vols remove_api stop

dev: ## run dev api & database in docker
	docker compose up dev

migrate_dev: 
	DATABASE_URL=postgres://postgres:password@localhost:5432/postgres npm run migrate

seed_dev: ## run seeder for dev environment
	DATABASE_URL=postgres://postgres:password@localhost:5432/postgres knex seed:run
	
nuke: # wipes out dev environment
	make stop
	make remove_api
	make prune_sys
	make prune_vols
	make dev

prune_img: ## run docker prune on all stopped/not in use images
	docker image prune

prune_sys: ## run docker prune for system (stopped containers, dead networks, unused images, build cache)
	docker system prune

prune_vols: ## run docker prune for volumes not in use by a container
	docker volume prune

remove_api: ## delete docker API image, by reference & formatting to pass ID into rmi cmd
	@docker rmi --force $$(docker images --filter=reference="groovebase-api-dev" --format="{{.ID}}")

setup_local_db: ## run migrations and seeds for local database
	make migrate_dev
	make seed_dev

stop:
	docker compose down