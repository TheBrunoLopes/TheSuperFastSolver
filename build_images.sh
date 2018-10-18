#!/bin/bash
# We could aslo build the images in the docker-compose file, instead of a separate script
cd solver_gui
docker build --rm -f Dockerfile -t solver_gui .
cd ../solver_service
docker build --rm -f Dockerfile -t solver_service .
cd ..
