1. https://applix.ru/articles/ustanovka-openssl-na-windows-server-2016/ установка
2. Созаем дирректорию для ключей
3. Создаем файл в этой дирректории server.key команда echo $null >> server.key для Windows
4. Заходим в папку OpenSSL/bin
5. openssl req  -nodes -new -x509  -keyout c:/Demo/server.key
6. openssl req -new -x509 -key c:/Demo/server.key -out c:/Demo/server.crt
7. openssl req -new -x509 -key c:/Demo/server.key -out c:/Demo/server.pem