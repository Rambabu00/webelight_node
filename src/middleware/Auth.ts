import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
    user?: any;
}

const AuthCustomer = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        console.log('Customer Middleware - Token:', token);

        if (!token) {
            console.error('Customer Middleware - Unauthorized - Token missing');
            return res.status(401).json({
                "statusCode": 401,
                message: 'Unauthorized - token missing'
            });
        }

        const key = process.env.SECRET_KEY || undefined;
        if (key === undefined) {
            console.error('Customer Middleware - Internal Server Error - Secret key not defined');
            return res.status(500).send({ message: 'Internal Server', Error: 'Secret key not defined' });
        }

        const decoded = jwt.verify(token, key);
        console.log('Customer Middleware - Decoded Token:', decoded);

        req.user = decoded;

        if (req.user.role === "customer" && decoded) {
            next();
        } else {
            console.error('Customer Middleware - Forbidden - Customer access required');
            return res.status(403).send({ message: 'Forbidden - customer access required' });
        }
    } catch (error) {
        console.error('Customer Middleware - Error verifying token:', error);
        res.status(401).send({
            message: 'Unauthorized - Invalid User token',
            error: error
        });
    }
}

const AuthAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        console.log('Admin Middleware - Token:', token);

        if (!token) {
            console.error('Admin Middleware - Unauthorized - Token missing');
            return res.status(401).json({
                "statusCode": 401,
                message: 'Unauthorized - token missing'
            });
        }

        const key = process.env.SECRET_KEY || undefined;
        if (key === undefined) {
            console.error('Admin Middleware - Internal Server Error - Secret key not defined');
            return res.status(500).send({ message: 'Internal Server', Error: 'Secret key not defined' });
        }

        const decoded = jwt.verify(token, key);
        console.log('Admin Middleware - Decoded Token:', decoded);

        req.user = decoded;

        if (req.user.role === "admin" && decoded) {
            next();
        } else {
            console.error('Admin Middleware - Forbidden - Admin access required');
            return res.status(403).send({ message: 'Forbidden - admin access required' });
        }
    } catch (error) {
        console.error('Admin Middleware - Error verifying token:', error);
        res.status(401).send({
            message: 'Unauthorized - Invalid User token',
            error: error
        });
    }
}

export { AuthAdmin, AuthCustomer, CustomRequest }
