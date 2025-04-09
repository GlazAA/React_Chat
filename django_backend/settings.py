DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_postgres_db',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    },
    'mongodb': {
        'ENGINE': 'djongo',
        'NAME': 'your_mongo_db',
    }
}

DATABASE_ROUTERS = ['path.to.your.DatabaseRouter'] 