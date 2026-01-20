@echo off


echo Changing directory client...
cd "Frontend\react-project"

echo Building Docker image client...
docker build --no-cache -t eatlog-client .

echo Docker login...
docker login

echo Tagging Docker image client...
docker tag eatlog-client:latest 0taras0/eatlog-client:latest

echo Pushing Docker image client to repository...
docker push 0taras0/eatlog-client:latest

echo Done ---client---!


echo Changing directory api...
cd "../.."
cd "Backend"

echo Building Docker image api...
docker build --no-cache -t eatlog-api . 

echo Tagging Docker image api...
docker tag eatlog-api:latest 0taras0/eatlog-api:latest

echo Pushing Docker image api to repository...
docker push 0taras0/eatlog-api:latest

echo Done ---api---!
pause

