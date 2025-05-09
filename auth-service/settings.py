import os

USER = 'postgres' if os.getenv('DB_HOST') is None else os.getenv('DB_HOST')
PASSWORD = 'postgres' if os.getenv('DB_PASSWORD') is None else os.getenv('DB_PASSWORD')
DB_NAME = 'gamedb' if os.getenv('DB_NAME') is None else os.getenv('DB_NAME')
"""  """