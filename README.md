# Book Record Managment API | FSWD-4.1 (*Upgraded*)
This is a Book Record Managment API Backend Application, a Node.js backend application, leveraging the Express.js framework, manages books, users, and subscriptions - enabling efficient book management.

## Functionalities:
- **CRUD Operations**: Supports Create, Read, Update, and Delete operations on users, books, and subscriptions.
- **User Management**: Handles user creation, data retrieval, subscription management, and fine tracking.
- **Book Management**: Enables adding new books with details, tracking issued books, managing returns, and identifying books with outstanding fines.
- **Subscription Plans**: Offers configurable subscription plans with varying durations and privileges. (Future enhancement) Integration for calculating fines based on overdue days and subscription type.
- **Routing**: The API utilizes a well-defined routing structure using Express.js routes to handle various requests for book management tasks.
- **Schema-based Models**: Leverages a dedicated models for books and users defining robust data structures using Mongoose schemas, ensuring data integrity and consistency.
- **Integrated with MongoDB**

## Routes and Endpoints:
The structure is well-defined, separating user and book management routes.

### User Endpoints:
- Create  (POST /users): Allows creating new users.  
- Get All (GET /users): Retrieves a list of all registered users.  
- Get by ID (GET /users/{id}): Fetches a specific user's details based on their ID.  
- Update (PUT /users/{id}): Updates user information with the provided data.  
- Delete (DELETE /users/{id}): Deletes a user. Consider adding a check for issued books and outstanding fines before deletion.  
- Subscription Details (GET /users/subscription-deails/{id}): Retrieves subscription details for a specific user, including start date, validity period, and any outstanding fines.  

### Book Endpoints:
- Get All (GET /books): Returns a list of all books in the system.
- Create (POST /books): Allows adding new books to the system.
- Get by ID (GET /books/{id}): Retrieves information about a specific book based on its ID.
- Update (PUT /books/{id}): Updates details of an existing book.
- Issued Books (GET /books/issued): Lists all currently issued books.

## Skills Highlighted
- **Backend Development**: The project demonstrates proficiency in building backend applications using Node.js and Express.js.
- **API Design**: It showcases the ability to design and implement well-structured and RESTful APIs for data interaction.
- **Integration with MongoDB**: Seamless integration with MongoDB for data storage and retrieval.
- **Schema Development**: Utilizing Mongoose schemas for robust data modeling.
- **Usage of DTO's**: 
 * Reduced duplication: Reduces code duplication by providing a centralized location to define data structures used across different parts of the application.
 * Improved Data Readabilty: Makes data structures more explicit and easier to understand by separating data used for specific purposes.
 * Enhanced Data Validation: Implements data validation logic at the object level ensuring integrity.
