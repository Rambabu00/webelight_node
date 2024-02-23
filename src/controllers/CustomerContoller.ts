import { Response } from "express";
import { UserModel } from "../model/UserSchema";
import { CustomRequest } from "../middleware/Auth";

const getAllCustomers = async (req: CustomRequest, res: Response) => {
    try {
        const customersData = await UserModel.find({ role: "customer" });

        if (customersData.length > 0) {
            return res.status(200).send({
                message: "Successfully fetched all customers data",
                data: customersData
            });
        }

        return res.status(200).send({
            message: "Successfully fetched but no customers",
            data: customersData
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error fetching customers",
            data: error
        });
    }
};

const DeleteAccount = async (req: CustomRequest, res: Response) => {
    const user_id: string = req.params.userId;

    if (!user_id) {
        return res.status(400).send({
            message: "user_id is not present in the params",
            data: user_id
        });
    }

    // checking user is authorized or not
    if (req.user.userId !== user_id) {
        return res.status(401).send({
            message: "Unauthorized - userId is not matched"
        });
    }

    try {
        const flag = await UserModel.findByIdAndDelete(user_id);

        if (!flag) {
            return res.status(404).send({
                message: "User is not found"
            });
        }

        return res.status(200).send({
            message: "Account Deletion is successful"
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error deleting account",
            data: error
        });
    }
};

export { getAllCustomers, DeleteAccount };
