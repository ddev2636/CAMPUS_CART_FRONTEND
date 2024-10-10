# **Campus Cart**

Campus Cart is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to create a trusted and localized marketplace within a college campus. The platform allows students to buy and sell used items such as books, gadgets, and other essentials efficiently and securely.

## **Features**

- **User Authentication**: Secure login and registration using JWT tokens and HTTP-only cookies.  
- **Product Listings**: Students can list, search, and purchase items with ease.  
- **File Uploads**: Firebase is used for handling image uploads in a simple and scalable manner.  
- **Microservices Architecture (Mimicked)**: The app is structured to follow a microservice-like pattern, featuring: **Authentication Service** for user registration, login, and token issuance; and **Product Service** for handling product listings and related operations.  
- **Deployment**: Containerized using Docker and deployed on AWS EC2 with CI/CD managed via GitHub Actions.  
- **Security**: JWT tokens are securely stored in HTTP-only cookies to protect against XSS attacks.

## **Tech Stack**

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas (cloud)  
- **Authentication**: JWT and HTTP-only cookies  
- **File Storage**: Firebase for image uploads  
- **Deployment**: Docker, Docker Compose, AWS EC2, GitHub Actions  
- **Containerization**: Docker for service management  
- **DevOps**: Docker Hub, GitHub Actions for CI/CD automation

## **Architecture Overview**

Campus Cart follows a microservice-like architecture designed for modularity and scalability. This approach helps simulate a real-world microservices setup, providing flexibility and independent deployment of services: **Authentication Service** manages user operations such as registration and login, and issues JWT tokens stored in HTTP-only cookies for security; **Product Service** manages product-related functionalities like creating listings and viewing available items.

## **Getting Started**

### **Prerequisites**

Ensure the following software is installed: Node.js (v14 or higher), Docker and Docker Compose, MongoDB Atlas account and cluster, Firebase account for file storage, and AWS account for deployment (EC2 instance setup).

### **Installation**

1. Clone the repository:  
   `git clone https://github.com/your-username/campus-cart.git`
   
2. Navigate to the project directory:  
   `cd campus-cart`
   
3. Install dependencies for each service:  
   `cd authentication-service && npm install`  
   `cd ../product-service && npm install`
   
4. Environment Variables:  
   Create `.env` files for both services based on `.env.example` files found in each service’s folder. Add the following environment variables:  

   - **Authentication Service (`authentication-service/.env`)**:  
     `MONGO_URI=your-mongodb-connection-string`  
     `JWT_SECRET=your-jwt-secret`  
   
   - **Product Service (`product-service/.env`)**:  
     `MONGO_URI=your-mongodb-connection-string`  
     `JWT_SECRET=your-jwt-secret`  
     `FIREBASE_CONFIG=your-firebase-config`

### **Running Locally**

Ensure MongoDB Atlas is set up and the connection string is added to your environment variables. Set up Firebase for file uploads and update the configuration in the `.env` file of the product service. Run the services locally using Docker Compose:  
   `docker-compose -f docker-compose.dev.yml up --build`  
Access the application in your browser:  
   - **Frontend**: [http://localhost:3000](http://localhost:3000)  
   - **API Services**:  
     - Authentication: [http://localhost:5001](http://localhost:5001)  
     - Product Service: [http://localhost:5000](http://localhost:5000)
