# **Bi-Cycle Store API**  

A TypeScript-based backend application for managing products and orders in a bicycle store, developed using **Express.js**, **MongoDB**, **Mongoose**, and **Zod** for input validation.

---

## **Project Objective**  

The **Bi-Cycle Store API** aims to manage product inventory and order processing with robust validations, clean architecture, and professional-grade coding practices. The application provides **CRUD operations** for products and orders, ensuring **data integrity** and **user-friendly error handling**.

---

## **Features**

### **1. Product Management**

- **CRUD Operations**: Create, Read, Update, and Delete (CRUD) operations for bicycles.  
- **Validations**:
  - **Required Fields**: `Name`, `Brand`, `Type`, `inStock`, `Quantity`, and `Price` are validated using **Zod** and **Mongoose schema**.
  - **Type Enum Validation**: Supports the following bicycle types: `Mountain`, `Road`, `Hybrid`, `BMX`, and `Electric`.
  - Ensures **positive values** for `price` and `quantity`.
  - **Boolean Checks**: Validates `inStock` and other boolean flags.
  - **Dynamic Stock Updates**:  
    - If the `quantity` is `0`, the `inStock` value is automatically set to `false`, even if `true` is provided in the input.

- **Error Handling**:
  - Custom error messages for validation failures (e.g., required fields, enum & type mismatch).  
  - Prevents invalid product creation or updates.

 ### **2. Order Management**

- **CRUD Operations**: Create, Read, Update, and Delete (CRUD) operations for orders.  

- **Inventory Updates**:
  - **Reduces Product Stock**: Automatically reduces the product stock when an order is placed.
  - **Prevents Orders** if:
    - Stock is insufficient.
    - `inStock` is `false`.
    - The product is deleted or unavailable.

- **Aggregation Operation**:
  - Calculates **total revenue** from all orders.
  - Uses the **MongoDB aggregation pipeline** for efficient processing.

- **Validations**:
  - Prevents orders with invalid quantities or missing products.
  - Ensures accurate total price calculations.

### **3. Endpoints**

#### **1. Product Endpoints**
- **Create Product**: `/api/products` (POST)  
- **Get All Products**: `/api/products` (GET)  
- **Get Product by ID**: `/api/products/:productId` (GET)  
- **Update Product**: `/api/products/:productId` (PUT)  
- **Delete Product**: `/api/products/:productId` (DELETE)  

#### **2. Order Endpoints**
- **Create Order**: `/api/orders` (POST)  
- **Get All Orders**: `/api/orders` (GET)  
- **Get Order by ID**: `/api/orders/:orderId` (GET)  
- **Delete Order**: `/api/orders/:orderId` (DELETE)  
- **Calculate Revenue**: `/api/orders/revenue` (GET)  

### **4. Architecture**

- **TypeScript**:
  - Interfaces and types for **strong type checking**.
  - **Clean and readable code** with strict linting using **ESLint** and **Prettier**.

- **Mongoose**:
  - **Schemas and models** for data definition and operations.
  - **Middleware** for custom business logic (e.g., pre-save hooks).
  - **Static methods** for reusable database logic.

- **Zod**:
  - **Input validation** with custom error messages for improved user experience.
  - Ensures **data consistency** before database operations.

### **5. Technologies Used**

- **Languages & Frameworks**:
  - **TypeScript**
  - **Express.js**

- **Database**:
  - **MongoDB**
  - **Mongoose**

- **Validation**:
  - **Zod**

- **Code Quality**:
  - **ESLint** with **Prettier**

- **Deployment**:
  - **[GitHub & Vercel]**

### **6. Validations**

#### **Product Validation**
- **Name, Brand, Price, Type**: Required fields with type checks.
- **Enum Validation**: Ensures type matches predefined categories.
- **Quantity & Price**: Must be positive numbers.
- **inStock**: Boolean (true/false).
- **Custom Messages**:
  - Example: *"Price must be a positive number".*

#### **Order Validation**
- **Stock Checks**:
  - Fails if `orderQuantity > product.quantity`.
  - Prevents ordering deleted products or products out of stock.
- **Accurate Pricing**:
  - Total price calculated as `product.price * orderQuantity`.
- **Product Validation**:
  - Ensures valid product references and availability.

### **7. Folder Structure**

```plaintext
📦 Bi-Cycle Store
├── 📂 dist                  # Compiled JavaScript files (build output)
│   ├── 📂 app
│   ├── 📂 config
│   ├── 📂 modules
│   │   ├── 📂 orders
│   │   │   ├── orders.controllers.js
│   │   │   ├── orders.interface.js
│   │   │   ├── orders.models.js
│   │   │   ├── orders.service.js
│   │   │   └── orders.validation.zod.js
│   │   ├── 📂 products
│   │   │   ├── products.controllers.js
│   │   │   ├── products.interface.js
│   │   │   ├── products.models.js
│   │   │   ├── products.service.js
│   │   │   └── products.validation.zod.js
│   ├── app.js
│   ├── routes.js
│   └── server.js
├── 📂 src                   # Source TypeScript files
│   ├── 📂 app
│   ├── 📂 config            # Configuration files
│   ├── 📂 modules
│   │   ├── 📂 orders
│   │   │   ├── orders.controllers.ts
│   │   │   ├── orders.interface.ts
│   │   │   ├── orders.models.ts
│   │   │   ├── orders.service.ts
│   │   │   └── orders.validation.zod.ts
│   │   ├── 📂 products
│   │   │   ├── products.controllers.ts
│   │   │   ├── products.interface.ts
│   │   │   ├── products.models.ts
│   │   │   ├── products.service.ts
│   │   │   └── products.validation.zod.ts
│   ├── app.ts
│   ├── routes.ts
│   └── server.ts
├── 📂 node_modules          # Installed npm dependencies
├── .env                     # Environment variables (e.g., database connection strings)
├── .gitignore               # Git ignore file
├── .prettierrc.json         # Prettier configuration
├── eslint.config.mjs        # ESLint configuration
├── package-lock.json        # Dependency lock file
├── package.json             # Project metadata and dependencies
├── tsconfig.json            # TypeScript configuration
└── vercel.json              # Vercel deployment configuration

```
### **8. Environment Variables**

The application uses the following environment variables. Ensure to set these values in a `.env` file before running the application:

```plaintext
NODE_ENV = development
PORT = <your_port_number>         # Example: 5000
DATA_BASE_URL = <your_database_url>  # Example: mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database-name>
