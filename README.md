# Clone the repository

- use the git clone command to clone this repository and it should clone into a folder called bike_marketplace. The rest of the instructions are written assumming this is true

# Setup Python Virtual Environment

- Run python3 -m venv <name of venv>. Here you can choose any name you wish, but be sure to use that same name throughout the rest of the instructions

# Active Python Virtual Environment

- Run source <name of venv>/bin/activate

# Install Python Packages

- Run cd bike_marketplace/bike_marketplace_backend
- Run pip install -r requirements.txt

# Run Django Init Commands - These only need to be run the first time

- Run python manage.py makemigrations
- Run python manage.py migrate

# Run the Backend Django Server

- Run python manage.py runserver. This should open the api server on port 8000

# Install NPM packages - Open another terminal window

- Run cd ../bike_marketplace_frontend
- Run npm install

# Run the development frontend server

- Run npm start