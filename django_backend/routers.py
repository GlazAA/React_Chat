class DatabaseRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'chat':
            return 'mongodb'
        return 'default'

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'chat':
            return 'mongodb'
        return 'default' 