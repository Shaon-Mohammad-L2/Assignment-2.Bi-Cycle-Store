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


