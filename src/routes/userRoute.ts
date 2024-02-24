// userRoutes.ts
import { Router } from 'express';
import { register, login } from '../controllers/userController';

const userRouter = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user with name, email, password, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request - Invalid input
 */
   userRouter.post("/register", register)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: Endpoint to log in a user with email, password, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 role:
 *                   type: string
 *                   enum: [admin, customer]
 *                   example: customer
 *       '401':
 *         description: Unauthorized - Invalid credentials
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: rambabukadagala@gmail.com
 *         password:
 *           type: string
 *           example: mysecretpassword
 *         role:
 *           type: string
 *           enum: [admin, customer]
 *           example: customer
 *
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: rambabukadagala@gmail.com
 *         password:
 *           type: string
 *           example: mysecretpassword
 *         role:
 *           type: string
 *           enum: [admin, customer]
 *           example: customer
 */
userRouter.post('/login', login);

export default userRouter;
