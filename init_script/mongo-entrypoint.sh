#!/usr/bin/env bash
echo "Creating an unique index for the name attribute in the functions collection"
mongo functionsDB --eval "db.functions.createIndex({name:1}, {unique:true})"
