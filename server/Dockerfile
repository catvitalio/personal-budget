FROM python:3.8.5-slim

RUN mkdir /app && apt-get update && apt-get install -y git libpq-dev postgresql-client
WORKDIR /app

ADD ./server/requirements/prod.txt /app/prod.txt
ADD ./server/requirements/dev.txt /app/requirements.txt

RUN pip install -r requirements.txt
