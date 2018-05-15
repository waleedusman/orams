# ORAMS
A website to manage prices for the ATO ORAMS panel.
## Install
### Backend
```
cd backend
virtualenv venv
source venv/bin/activate
```
### Frontend
```
cd frontend
npm i
npm run build:development
```
## Run
## Backend
```
make app_run
```
This starts the API at http://localhost:5000.
### Frontend
```
npm run server:development
```
This starts the node server at http://localhost:60000.

On local, `/api` calls are proxied to http://localhost:5000. 
