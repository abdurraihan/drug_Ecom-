# SilentMines API

This project provides a RESTful API for managing products and announcements.

## Product API

Base URL: `/api/products`

### 1. Add Product

**Endpoint:** `POST /api/products`  
**Description:** Add a new product.

**Request Body Example:**
```json

  "name": "Product Name",
  "description": "Product description",
  "category": "flower",
  "type": "jar",
  "priceOptions": [
    { "unit": "1g", "price": 10 },
    { "unit": "3.5g", "price": 30 }
  ],
  "photoUrls": ["url1.jpg", "url2.jpg"],
  "videoUrls": ["video1.mp4"]
}
```

**Success Response:**
- **Status:** `201 Created`
- **Body:**  
  ```json
  {
    "message": "Product created successfully.",
    "data": { /* product object */ }
  }
  ```

---

### 2. Edit Product

**Endpoint:** `PUT /api/products/:id`  
**Description:** Update an existing product by ID.

**Request Params:**
- `id` (string): Product ID

**Request Body Example:**  
(Same as Add Product, include only fields to update.)

**Success Response:**
- **Status:** `200 OK`
- **Body:**  
  ```json
  {
    "message": "Product updated successfully.",
    "data": { /* updated product object */ }
  }
  ```

---

### 3. Delete Product

**Endpoint:** `DELETE /api/products/:id`  
**Description:** Delete a product by ID.

**Request Params:**
- `id` (string): Product ID

**Success Response:**
- **Status:** `200 OK`
- **Body:**  
  ```json
  {
    "message": "Product deleted successfully."
  }
  ```

---

## Notes

- All endpoints expect and return JSON.
- Make sure to set the correct `Content-Type: application/json` header.
- For authentication and authorization, implement as needed.