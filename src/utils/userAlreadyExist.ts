import { User , UserModel} from "../model/UserSchema";

interface UserExistenceResult {
  message: boolean | null;
  data: User | null;
}

const userAlreadyExist = async (email: string | undefined, role:string | undefined): Promise<UserExistenceResult> => {
  try {
    if (email === undefined || role===undefined) {
      // Handle the case where email is undefined
      return {
        message: false,
        data: null,
      };
    }

    const data = await UserModel.findOne({ email, role });

    if (data) {
      return {
        message: true,
        data,
      };
    } else {
      return {
        message: false,
        data: null,
      };
    }
  } catch (error) {
    // Handle any potential errors here
    return {
        message: false,
        data: null,
      };
  }
};

export default userAlreadyExist;
