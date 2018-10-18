# TheSuperFastSolver
Solver that can calculate the numerical result of any of the functions specified by the user.
## Folders and files of interest
```
functionSolver/
    solver_gui/         - The front-end project written using React and Redux (Javascript)
    solver_service/     - The  back-end project written in Python 3.6
    docker-compose.yaml - docker-compose that runs the fron-end, back-end and mongo-database
    build_images.sh     - Builds the solver_gui and solver_service images
    README.md           - You are here
```
It is very important to read the README.md files located in the solver_gui and solver_service
folders before starting to look at the code.

## Run this project

### Using docker
```bash
$ ./build_images.sh
$ docker-compose up -d
```
You can now go to `localhost:80` to see the front-end.

The back-end is on `localhost:4001/v1`.
If you go to `localhost:4001/v1/ui` you will see a pretty gui that shows all the endpoints on the back-end.

### Do it yourself
I see you are a person that takes matters into his own hands
#### Solver Service
To run the the solver_service you can go to the `solver_service` folder and do
```bash
pip install -r requirements.txt
```
to install the dependencies (you should have a venv activated at this point).
Now  we can run the application in dev mode
```bash
python application.py
```
or usign a WSGI
```bash
uwsgi --http :4001 -w application:application -p 16
```
#### Solver Gui
Go the the `solver_gui` directory and do
```bash
npm install
npm start
```
These two commands install the dependencies and then start a dev server
#### Database
You could still use a mongo database by doing
```bash
docker run --name some-mongo --net=host -d mongo
```
If you don't, you need to have the mongoDB running in your machine and available on port 27017
