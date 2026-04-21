import SignupForm from "./SignupForm";

export interface FormState {
  first_name: "";
  last_name: "";
  email: "";
  date_of_birth: "";
}

// Submit not optional
export interface Props {
  onSubmit: (form: FormState) => Promise<void>;
}

function Signup() {
  return <SignupForm onSubmit={onsubmit(form)}></SignupForm>;
}

export default Signup;
