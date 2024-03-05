# My Contact App

This project is a contact management application built with Python Flask as the backend and React as the frontend. The app supports basic CRUD operations (Create, Read, Update, Delete) and implements basic error handling. The backend utilizes SQLAlchemy as the database ORM for data storage.

<img width="458" alt="image" src="https://github.com/YouXuan2010/My-Contact-App/assets/100280753/6e9c424f-cee9-4fae-998e-012c51af83b1">

## Features

- **Create:** Add new contacts with their first name, last name, and email.
- **Read:** View a list of contacts with their details.
- **Update:** Modify existing contact information.
- **Delete:** Remove unwanted contacts from the database.
- **Error Handling:**
  - Ensure non-empty entries for first name, last name, and email fields.
  - Prevent the creation of contacts with duplicate email addresses.

## Technologies Used

- **Backend:**
  - Flask: A lightweight web framework for building the backend.
  - SQLAlchemy: An ORM for working with databases in Flask applications.

- **Frontend:**
  - React: A JavaScript library for building user interfaces.

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YouXuan2010/My-Contact-App.git
   ```

2. Navigate to the backend directory and install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
   
3. Navigate to the frontend directory and install npm packages:
   ```bash
   cd frontend
   npm install
   ```

### Running the application

1. Start the Flask backend:
   ```bash
   cd backend
   python main.py
   ```

2. Start the React frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   
## API Endpoints

### Get Contacts

- **GET /contacts**
  - Get a list of all contacts.
  - **Response:**
    ```json
    {
      "contacts": [
        {"id": 1, "first_name": "John", "last_name": "Doe", "email": "john.doe@example.com"},
      ]
    }
    ```

### Create Contact

- **POST /create_contact**
  - Create a new contact.
  - **Request:**
    ```json
    {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com"}
    ```
  - **Response:**
    ```json
    {"message": "Contact created successfully"}
    ```
  - **Error Response:**
    ```json
    {"message": "You must provide a first name, last name, and email"}
    ```

### Update Contact

- **PATCH /update_contact/{user_id}**
  - Update information for a specific contact.
  - **Request:**
    ```json
    {"firstName": "Updated John", "lastName": "Updated Doe", "email": "updated.john.doe@example.com"}
    ```
  - **Response:**
    ```json
    {"message": "Contact updated successfully"}
    ```
  - **Error Response:**
    ```json
    {"message": "Contact not found"}
    ```

### Delete Contact

- **DELETE /delete_contact/{user_id}**
  - Delete a contact.
  - **Response:**
    ```json
    {"message": "Contact deleted successfully"}
    ```
  - **Error Response:**
    ```json
    {"message": "Contact not found"}
    ```


