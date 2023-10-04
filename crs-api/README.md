# Python Django REST API (crs-api)

## Running the API

1. Install `virtualenv` using `pip install virtualenv`
2. Create a virtual python environment using `virtualenv venv`
3. Activate the virtual environment. This step varies depending on the OS, so run the command relevaten to your system:

   > Bash: `source ./venv/bin/activate`
   >
   > Fish: `source ./venv/bin/activate.fish`
   >
   > Windows: `./venv/Scripts/activate`

4. Install dependencies to the virtual environment using `pip install -r requirements.txt`
5. Start the API with `python manage.py runserver`
6. Optionally, you can choose the port to run the server on by adding a port after runserver, e.x. `python manage.py runserver 5001`
