import { Card } from "primereact/card";
import { useLogin } from "../../hooks/useLogin";
import LoginForm from "./LoginForm";
import { commonStyles } from "../../helpers/styles";

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
        <Card style={commonStyles.card} title="Connexion" subTitle="Accédez à votre espace personnel">
          <span style={commonStyles.accent} />
          <LoginForm onSubmit={loginUser}></LoginForm>
          <p className="text-center text-sm text-600 mt-4">
          Pas encore de compte ?{" "}
          <a href="#" className="text-900 font-semibold no-underline">
            S'inscrire
          </a>
        </p>
        </Card>
    </>
  );
}

export default Login;
