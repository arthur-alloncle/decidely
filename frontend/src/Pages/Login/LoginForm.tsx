import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import type { FormState, Props } from "./Login";

function Login({ onSubmit }: Props) {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    onSubmit(form);
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
        <InputText
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <Button type="submit" disabled={!form.email || !form.password}>
          login
        </Button>
      </div>
    </form>
  );
}

export default Login;
