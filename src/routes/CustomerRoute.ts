import { Router } from "express";
import {AuthAdmin, AuthCustomer} from "../middleware/Auth";
import {getAllCustomers, DeleteAccount} from "../controllers/CustomerContoller";
const customerRouter= Router();
 
/**
 * @swagger
 * /allCustomers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieve a list of all customers. This operation requires admin access.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *     responses:
 *       '200':
 *         description: Successful response with the list of customers
 *         content:
 *           application/json:
 *             example:
 *               customers:
 *                 - _id: acjvsnsj34n4nt4t4344
 *                   name: Ram
 *                   email: email@gmail.com
 *                   role: customer
 *                 - _id: acjvsnsj34n4nt4t4345
 *                   name: John Doe
 *                   email: john@gmail.com
 *                   role: customer
 *       '401':
 *         description: Unauthorized - Missing or invalid admin token
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       '403':
 *         description: Forbidden - Customer access required
 *         content:
 *           application/json:
 *             example:
 *               error: Forbidden
 *     security:
 *       - BearerAuthAdmin: []
 */
customerRouter.get("/allCustomers", AuthAdmin, getAllCustomers);
 /**
 * @swagger
 * /deleteAccount/{userId}:
 *   delete:
 *     summary: Delete customer account
 *     description: Delete the account of the current customer. This operation requires customer access.
 *     security:
 *       - BearerAuthCustomer: []   # Security requirement: Customer token required
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication (customer token)
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the customer whose account needs to be deleted
 *     responses:
 *       '200':
 *         description: Successful response indicating account deletion
 *         content:
 *           application/json:
 *             example:
 *               message: Account deleted successfully
 *       '401':
 *         description: Unauthorized - Missing or invalid customer token
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 */

customerRouter.delete("/deleteAccount/:userId", AuthCustomer, DeleteAccount)
export default customerRouter