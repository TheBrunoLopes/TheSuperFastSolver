import logging
import connexion as connexion
from flask_cors import CORS

logging.basicConfig(level=logging.INFO)

app = connexion.App(__name__, swagger_ui=True)

app.add_api('swagger.yaml')
application = app.app
# It's not a good practice to enable CORS and should not be used in production
# Remove the following line to disable CORS
CORS(application)

if __name__ == '__main__':

    # If you want to run this with a WSGI
    # you could use the command: uwsgi --http :4001 -w application:application -p 16
    # This service depends on a mongo database
    # you can quickly run one for this by doing -> docker run --name some-mongo --net=host -d mongo
    app.run(port=4001, debug=True)
