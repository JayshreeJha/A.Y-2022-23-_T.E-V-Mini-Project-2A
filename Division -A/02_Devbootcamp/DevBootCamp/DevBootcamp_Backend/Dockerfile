# # pull official base image
# FROM python:3.9.5-slim-buster

# # set work directory
# WORKDIR /usr/src/app

# # set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1
# ENV APP_SETTINGS "config.DevelopmentConfig"
# ENV DATABASE_URL "postgresql://freakstar03:password@db:5432/devbootcamp"
# ENV SECRET_KEY "004f2af45d3a4e161a7dd2d17fdae47f"

# # install dependencies
# RUN pip install --upgrade pip
# COPY ./requirements.txt /usr/src/app/requirements.txt
# RUN pip install -r requirements.txt

# # copy project
# COPY . /usr/src/app/



# pull official base image
FROM python:3.9.5-slim-buster

# create directory for the app user
RUN mkdir -p /home/app

# create the app user
RUN addgroup --system nginx && adduser --system --group nginx

# create the appropriate directories
ENV HOME=/home/app
ENV APP_HOME=/home/app/web
ENV APP_SETTINGS="config.DevelopmentConfig"
ENV DATABASE_URL="postgresql://freakstar03:password@db:5432/devbootcamp"
ENV SECRET_KEY="004f2af45d3a4e161a7dd2d17fdae47f"
ENV STRIPE_PUBLISHABLE_KEY="pk_test_51LoRJbSFJVQA73jsmRJSJ5bwscbE8EkvTbuG7QgC4kgqepoFgzQrc7ylztTVB27ENClRCfLL1CnPPJVU6j1n4eMw00KW5huN5L"
ENV STRIPE_SECRET_KEY="sk_test_51LoRJbSFJVQA73jsdsH0Ntk7vPhZI4A9CfMC9yxduzQfdpU7WPsF75qYTAW7b1nRlHm4NLeMteCJl6TfjEKW6pta00V7R3NISk"
ENV SECURITY_PASSWORD_SALT="my_precious_two"
ENV APP_MAIL_USERNAME="freakstar03"
ENV APP_MAIL_PASSWORD="yeqzzkwqaerlmlfv"
ENV APP_MAIL_ID="freakstar03@gmail.com"
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# install dependencies
# RUN apt-get update && apt-get install -y --no-install-recommends netcat
# COPY --from=builder /usr/src/app/wheels /wheels
# COPY --from=builder /usr/src/app/requirements.txt .
# RUN pip install --upgrade pip
# RUN pip install --no-cache /wheels/*

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r /usr/src/app/requirements.txt

# copy entrypoint-prod.sh
COPY ./entrypoint.prod.sh $APP_HOME

# copy project
COPY . $APP_HOME

# chown all the files to the app user
RUN chown -R nginx:nginx $APP_HOME

# change to the app user
USER nginx

# run entrypoint.prod.sh
ENTRYPOINT ["/home/app/web/entrypoint.prod.sh"]