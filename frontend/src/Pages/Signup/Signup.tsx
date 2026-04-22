import SignupForm from "./SignupForm";
import { useSignup } from "../../hooks/useSignup";

export interface FormState {
  first_name: "";
  last_name: "";
  email: "";
  date_of_birth: "";
  password: "";
}

// Submit not optional
export interface Props {
  onSubmit: (form: FormState) => Promise<void>;
}

function Signup() {
  const { createNewUser } = useSignup();

  return (
    <>
      <div className="text-center">
        <h1>Login</h1>
      </div>
      <div className="flex justify-content-center">
        <SignupForm onSubmit={createNewUser}></SignupForm>
      </div>
    </>
  );
}

export default Signup;
