import {Router} from "express";
import { AuthCustomer, AuthAdmin } from "../middleware/Auth";
import { PostProduct, AllProducts, getAllAdminProducts, filterProducts, updateProduct, deleteProduct} from "../controllers/ProductContoller";
const productRouter=Router();
/**
 * @swagger
 * /post-product:
 *   post:
 *     summary: Create a new product by admins
 *     description: Create a new product. This operation requires admin access.
 *     security:
 *       - BearerAuthAdmin: []   # Security requirement: Admin token required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *                 description: The name of the product
 *               product_category:
 *                 type: string
 *                 description: The category of the product
 *               product_brand:
 *                 type: string
 *                 description: The brand of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *             required:
 *               - product_name
 *               - product_category
 *               - product_brand
 *               - price
 *           example:
 *             product_name: "Sample Product"
 *             product_category: "Electronics"
 *             product_brand: "Sample Brand"
 *             price: 99.99
 *     responses:
 *       '200':
 *         description: Product created successfully
 *       '401':
 *         description: Unauthorized - Missing or invalid admin token
 *       '400':
 *         description: Bad request - Invalid input
 */
productRouter.post("/post-product", AuthAdmin, PostProduct);
/**
 * @swagger
 * /get-admin-products:
 *   get:
 *     summary: Get all products created by current admin
 *     description: Retrieve a list of all products for admin. This operation requires admin access.
 *     security:
 *       - BearerAuthAdmin: []   # Security requirement: Admin token required
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication. Include the token in the format 'Bearer <token>'.
 *     responses:
 *       '200':
 *         description: Successful response with the list of all products for admin
 *         content:
 *           application/json:
 *             example:
 *               products:
 *                 - _id: "acjvsnsj34n4nt4t4344"
 *                   Admin_id: "admin123"
 *                   product_name: "Sample Product 1"
 *                   product_category: "Electronics"
 *                   product_brand: "Sample Brand 1"
 *                   price: 99.99
 *                 - _id: "acjvsnsj34n4nt4t4345"
 *                   Admin_id: "admin123"
 *                   product_name: "Sample Product 2"
 *                   product_category: "Clothing"
 *                   product_brand: "Sample Brand 2"
 *                   price: 49.99
 *       '401':
 *         description: Unauthorized - Missing or invalid admin token
 */


productRouter.get("/get-admin-products", AuthAdmin, getAllAdminProducts);
 /**
 * @swagger
 * /get-all-products:
 *   get:
 *     summary: Get all products for customers
 *     description: Retrieve a list of all products for customers. This operation requires customer access.
 *     security:
 *       - BearerAuthCustomer: []   # Security requirement: Customer token required
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication. Include the token in the format 'Bearer <token>'.
 *     responses:
 *       '200':
 *         description: Successful response with the list of all products for customers
 *         content:
 *           application/json:
 *             example:
 *               products:
 *                 - _id: "acjvsnsj34n4nt4t4344"
 *                   Admin_id: "admin123"
 *                   product_name: "Sample Product 1"
 *                   product_category: "Electronics"
 *                   product_brand: "Sample Brand 1"
 *                   price: 99.99
 *                 - _id: "acjvsnsj34n4nt4t4345"
 *                   Admin_id: "admin123"
 *                   product_name: "Sample Product 2"
 *                   product_category: "Clothing"
 *                   product_brand: "Sample Brand 2"
 *                   price: 49.99
 *       '401':
 *         description: Unauthorized - Missing or invalid customer token
 */

productRouter.get("/get-all-products", AuthCustomer, AllProducts);
 
/**
 * @swagger
 * /get-filter-products:
 *   get:
 *     summary: Get filtered products based on customers requirement
 *     description: Retrieve a list of filtered products for customers. This operation requires customer access.
 *     security:
 *       - BearerAuthCustomer: []   # Security requirement: Customer token required
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication. Include the token in the format 'Bearer <token>'.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter products by name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter products by brand
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: Filter products by price
 *     responses:
 *       '200':
 *         description: Successful response with the list of filtered products for customers
 *         content:
 *           application/json:
 *             example:
 *               filteredProducts:
 *                 - _id: "acjvsnsj34n4nt4t4344"
 *                   Admin_id: "admin123"
 *                   product_name: "Filtered Product 1"
 *                   product_category: "Electronics"
 *                   product_brand: "Filtered Brand 1"
 *                   price: 129.99
 *                 - _id: "acjvsnsj34n4nt4t4345"
 *                   Admin_id: "admin123"
 *                   product_name: "Filtered Product 2"
 *                   product_category: "Clothing"
 *                   product_brand: "Filtered Brand 2"
 *                   price: 89.99
 *       '401':
 *         description: Unauthorized - Missing or invalid customer token
 */

productRouter.get("/get-filter-products", AuthCustomer, filterProducts);
 /**
 * @swagger
 * /update/{product_id}:
 *   put:
 *     summary: Update product details by product Id
 *     description: Update the details of a specific product. This operation requires admin access.
 *     security:
 *       - BearerAuthAdmin: []   # Security requirement: Admin token required
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication. Include the token in the format 'Bearer <token>'.
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to be updated
 *       - in: body
 *         name: body
 *         description: Updated product details
 *         required: true
 *         content:
 *           application/json:
 *             example:
 *               product_name: "Updated Product"
 *               product_category: "Electronics"
 *               product_brand: "Updated Brand"
 *               price: 149.99
 *     responses:
 *       '200':
 *         description: Successful response indicating product update
 *         content:
 *           application/json:
 *             example:
 *               message: Product updated successfully
 *       '401':
 *         description: Unauthorized - Missing or invalid admin token
 *       '404':
 *         description: Not Found - Product with the specified ID not found
 */

productRouter.put("/update/:product_id", AuthAdmin, updateProduct);
 
/**
 * @swagger
 * /delete/{product_id}:
 *   delete:
 *     summary: Delete a product by product ID
 *     description: Delete a product identified by its ID. This operation requires admin access.
 *     security:
 *       - BearerAuthAdmin: []   # Security requirement: Admin token required
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to be deleted
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication. Include the token in the format 'Bearer <token>'.
 *     responses:
 *       '200':
 *         description: Successful response indicating product deletion
 *         content:
 *           application/json:
 *             example:
 *               message: Product deleted successfully
 *       '401':
 *         description: Unauthorized - Missing or invalid admin token
 *       '404':
 *         description: Not Found - Product with specified ID not found
 */

productRouter.delete("/delete/:product_id", AuthAdmin, deleteProduct)
export default productRouter