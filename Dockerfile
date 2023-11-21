FROM php:7.2-apache

RUN docker-php-ext-install mysqli

RUN mkdir -p /var/www/html/js
RUN mkdir -p /var/www/html/css
RUN mkdir -p /var/www/html/img
RUN mkdir -p /var/www/html/handler

COPY ./css /var/www/html/css/
COPY ./img /var/www/html/img/
COPY ./handler /var/www/html/handler/
COPY ./index.html /var/www/html/
COPY ./js/main.bundle.js /var/www/html/js/
COPY ./js/global.js /var/www/html/js/