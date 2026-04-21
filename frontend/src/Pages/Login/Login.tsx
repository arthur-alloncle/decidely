import { useLogin } from "../../hooks/useLogin";
import LoginForm from "./LoginForm";

export interface FormState {
  email: string;
  password: string;
}

// Submit not optional
export interface Props {
  onSubmit: (form: FormState) => Promise<void>;
}

function Login() {
  const { loginUser } = useLogin();

  return (
    <>
      <div className="text-center">
        <h1>Login</h1>
      </div>
      <div className="flex justify-content-center">
        <LoginForm onSubmit={loginUser}></LoginForm>
      </div>
    </>
  );
}

export default Login;
