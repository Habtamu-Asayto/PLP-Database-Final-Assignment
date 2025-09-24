--Create Database
CREATE DATABASE Library_DB;
--Use Database
USE Library_DB;

-- Users & Profile (One-to-One)
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE
);
CREATE TABLE Profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  UserId INT UNIQUE,
  FOREIGN KEY (UserId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Authors & Books (One-to-Many)
CREATE TABLE Authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
CREATE TABLE Books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(100) UNIQUE,
  year INT,
  AuthorId INT,
  FOREIGN KEY (AuthorId) REFERENCES Authors(id) ON DELETE SET NULL
);

-- Categories & BookCategories (Many-to-Many)
CREATE TABLE Categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);
CREATE TABLE BookCategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  BookId INT,
  CategoryId INT,
  FOREIGN KEY (BookId) REFERENCES Books(id) ON DELETE CASCADE,
  FOREIGN KEY (CategoryId) REFERENCES Categories(id) ON DELETE CASCADE
);

-- Borrowers & Loans (Many-to-Many with extra fields)
CREATE TABLE Borrowers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255)
);
CREATE TABLE Loans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  BorrowerId INT,
  BookId INT,
  borrowDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  returnDate DATETIME,
  status ENUM('borrowed','returned','late') DEFAULT 'borrowed',
  FOREIGN KEY (BorrowerId) REFERENCES Borrowers(id) ON DELETE CASCADE,
  FOREIGN KEY (BookId) REFERENCES Books(id) ON DELETE CASCADE
);