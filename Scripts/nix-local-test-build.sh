#!/bin/bash

npm run build
docker build -t tdr/playoff_svr .
docker run -it --rm -p 8090:8090 tdr/playoff_svr