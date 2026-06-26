-- schema.sql
-- Lumière Skincare Store Database Initialization

-- Create Database
CREATE DATABASE IF NOT EXISTS `lumiere_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lumiere_db`;

-- Create Orders Table
CREATE TABLE IF NOT EXISTS `orders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `customer_name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `wilaya` VARCHAR(100) NOT NULL,
    `delivery_type` VARCHAR(255) NOT NULL,
    `product_name` TEXT NOT NULL,
    `total_price` INT NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    size VARCHAR(100),
    brand VARCHAR(100),
    old_price VARCHAR(50),
    current_price VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    tag VARCHAR(100),
    rating VARCHAR(50),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
