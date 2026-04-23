import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import type { FormState, Props } from "./Login";
import { commonStyles } from "../../helpers/styles";
import { Password } from "primereact/password";


function Login({ onSubmit }: Props) {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    onSubmit(form)
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-column gap-2">
        <label htmlFor="email">Adresse email</label>
        <InputText
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-column gap-2 mt-3">
        <label htmlFor="password">Mot de passe</label>
        <Password
          placeholder="••••••••"
          toggleMask
          feedback={false}
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <a href="#">
          <small>
            Mot de passe oublié ?
          </small>
          </a>
      </div>
      <div className="mt-3">
        <Button
          style={commonStyles.primarybutton}
          type="submit"
          disabled={!form.email || !form.password}
        >
          Se connecter
        </Button>
      </div>
    </form>
  );
}

export default Login;
