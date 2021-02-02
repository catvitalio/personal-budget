# How to start app

1. Create .env file in project root directory and insert required data:
   
   ```example
   SUPERUSER_NAME=root
   SUPERUSER_PASSWORD=1
   POSTGRES_DB=postgres
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   ```
2. Build containers:
   
   ```bash
   docker-compose build
   ```
3. Start app:
   
   ```bash
   docker-compose up
   ```
