import environ

env = environ.Env()
# reading .env file
environ.Env.read_env()

CLIENT_ID = env("CLIENT_ID")
CLIENT_SECRET = env("CLIENT_SECRET")
REDIRECT_URI = env("REDIRECT_URI")
