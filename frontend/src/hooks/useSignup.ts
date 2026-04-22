import { useState } from "react";
import { createUser } from "../api/user.api";

export const useSignup = () => {
    const [signup, setSignup] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    const createNewUser = async (form: any) => {
        try {
            const newUser = await createUser(form);
            signup && setSignup((prev: any) => [...(prev as []), newUser])
        } catch (err){
            console.error(err);
        }  finally {
            setLoading(false)
        }
    }
    return {createNewUser, loading}
}