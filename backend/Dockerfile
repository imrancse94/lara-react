# Use PHP 8.3 as the base image
FROM php:8.3-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory to /var/www/html
WORKDIR /var/www/html

# Copy the Laravel application files into the container
COPY . .

# Copy .env.example to .env
RUN cp .env.example .env

# Run Composer install to install dependencies (using the COPY command)
RUN composer install --no-dev --optimize-autoloader

# Expose the PHP FPM port (default 9000)
EXPOSE 9000
