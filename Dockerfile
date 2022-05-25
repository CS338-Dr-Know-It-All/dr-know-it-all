# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.10-slim

# Copy requirements.txt to the docker image and install packages
COPY requirements.txt /
RUN pip install -r requirements.txt

# Set the WORKDIR to be the folder
COPY . /app

# Expose port 5000
EXPOSE 5000
ENV PORT 5000
WORKDIR /app

# Use gunicorn as the entrypoint: --workers 1 --threads 1 means that I want to
# execute my app on only one worker (= 1 process) with a single thread. This is
# because I don't want to have 2 instances up at once because it might increase the billing. 
CMD exec gunicorn --bind :$PORT main:app --workers 1 --threads 1 --timeout 0