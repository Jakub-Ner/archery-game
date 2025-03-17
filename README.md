# Archery Game


## Databases

To pull images and start containers. 
```bash
docker-compose up # or docker compose up
```
*If you have troubles to start a database container, make sure you are not running another one locally.*

### PostgreSQL
```bash
# To enter psql shell in the container:
docker exec -it ag_postgres psql -U postgres
```

### Redis
```bash
# To enter redis-cli in the container:
docker exec -it ag_redis redis-cli
```

