.PHONY: help build up down logs clean dev-up dev-down dev-logs seed migrate

# Default target
help:
	@echo "Available commands:"
	@echo "  build     - Build all Docker images"
	@echo "  up        - Start production environment"
	@echo "  down      - Stop production environment"
	@echo "  logs      - View production logs"
	@echo "  dev-up    - Start development environment"
	@echo "  dev-down  - Stop development environment"
	@echo "  dev-logs  - View development logs"
	@echo "  seed      - Seed the database"
	@echo "  migrate   - Run database migrations"
	@echo "  clean     - Clean up all containers, images, and volumes"

# Production commands
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

# Development commands
dev-up:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

# Database commands
seed:
	docker-compose exec backend npm run seed

dev-seed:
	docker-compose -f docker-compose.dev.yml exec backend npm run seed

migrate:
	docker-compose exec backend npx prisma migrate deploy

dev-migrate:
	docker-compose -f docker-compose.dev.yml exec backend npx prisma migrate deploy

# Utility commands
clean:
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f
	docker volume prune -f

status:
	docker-compose ps

dev-status:
	docker-compose -f docker-compose.dev.yml ps

# Health checks
health:
	docker-compose exec backend wget --no-verbose --tries=1 --spider http://localhost:4000/health || echo "Backend health check failed"
	docker-compose exec frontend wget --no-verbose --tries=1 --spider http://localhost/health || echo "Frontend health check failed"

dev-health:
	docker-compose -f docker-compose.dev.yml exec backend wget --no-verbose --tries=1 --spider http://localhost:4000/health || echo "Backend health check failed" 