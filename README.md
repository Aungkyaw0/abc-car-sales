# ABC Car Sales Portal

A modern web application for buying and selling used cars, built with Laravel, React, and Inertia.js.

## Overview

ABC Car Sales Portal is a comprehensive platform that connects car sellers with potential buyers. The system features two distinct user roles (Users and Administrators) with specific functionalities for each, along with a guest visitor interface.

### Key Features

#### For Users
- User registration and authentication

- Car listing creation with image upload

- Profile management

- Bidding system

- Personal dashboard


#### For Administrators
- Comprehensive admin dashboard

- User management
- Car listing management
- Profile management
- System monitoring

#### For All Visitors
- Browse car listings

- Advanced search functionality
- About Us page
- Contact information

## Tech Stack

- **Backend:** Laravel 10.x

- **Frontend:** React 18.x with TypeScript
- **CSS Framework:** Tailwind CSS
- **State Management:** Inertia.js
- **Database:** MySQL
- **Authentication:** Laravel Sanctum
- **File Storage:** Laravel Storage

## Prerequisites

- PHP >= 8.1
- Node.js >= 16.x
- Composer
- MySQL >= 8.0
- Git

## Installation Guide

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/abc-car-sales.git
    ```
    ```bash
    cd abc-car-sales
    ```
2. **Install PHP dependencies**
    ```bash
    composer install
    ```
3. **Install Node.js dependencies**
    ```bash
    npm install
    ```
4. **Environment Setup**
    ```bash
    cp .env.example .env
    ```
    ```bash
    php artisan key:generate
    ```
5. **Configure your database in .env file**
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=abc_car_sales
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

6. **Run database migrations and seeders**
    ```bash
    php artisan migrate
    ```
    ```bash
    php artisan db:seed
    ```
7. **Set up storage link**
    ```bash
    php artisan storage:link
8. **Build assets**
    ```bash
    npm run dev
    ```
9. **Start the development server**
    ```bash
    php artisan serve
    ```
The application will be available at `http://localhost:8000`

## Default Admin Credentials
Email: admin@example.com
Password: password
## Development


## Contributing

1. Fork the repository

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Laravel Team

- React Team
- Inertia.js Team
- All contributors

## Code of Conduct
In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).