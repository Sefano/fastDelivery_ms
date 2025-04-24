Для работы приложений нужно создать .env в каждом микросервисе.

MS_PORT - порт микросервиса

AMPQ_URL - ссылка (либо локально) на менеджер очередей 
EXCHANGE_NAME - название обменника
*__BIND/*__QUEUE - название бинда и очереди

MONGO_URL - ссылка на кластер бд

JWT_SECRET - секретный ключ для токена

aws_access_key_id = айди из панели управления бакета
aws_secret_access_key = ключ доступа из панели управления бакета
endpoint_url = "https://storage.yandexcloud.net"
region = "ru-central1"

При поднятии контейнера с портом 8080, можно обращаться к микросервисам по пути http://localhost:8080/api/users/signin (пример)
При отдельном запуске без докера путь будет таким - http://localhost:4001/signin
