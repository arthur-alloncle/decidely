import SignupForm from "./SignupForm";
import { useSignup } from "../../hooks/useSignup";
import { commonStyles } from "../../helpers/styles";
import { Card } from "primereact/card";

const styles = {
  signupcard: {
    maxWidth: "800px"
  }
}

export interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: Date | null;
  password: string;
}

// Submit not optional
export interface Props {
  onSubmit: (form: FormState) => Promise<void>;
}

function Signup() {
  const { createNewUser } = useSignup();

  return (
    <>
      <Card
        style={{maxWidth: "800px", ...commonStyles.card}}
        title="Créer un compte"
        subTitle="Tous les champs sont obligatoires"
      >
        <div className="flex justify-content-center">
          <SignupForm onSubmit={createNewUser}></SignupForm>
        </div>
      </Card>
    </>
  );
}

export default Signup;
