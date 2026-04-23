import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import type { FormState, Props } from "./Signup";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import "../../App.css";
import { commonStyles } from "../../helpers/styles";

function SignupForm({ onSubmit }: Props) {
  const [form, setForm] = useState<FormState>({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: null,
    password: "",
  });

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    onSubmit(form);
  };

  const [date, setDate] = useState(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Any here
  const handleDobChange = (e: any) => {
    setDate(e.value);
    setForm((prev) => ({
      ...prev,
      date_of_birth: e.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid">
        <div className="flex flex-column gap-2 col-12 lg:col-6">
          <label htmlFor="first_name">Prénom</label>
          <InputText
            type="text"
            name="first_name"
            id="first_name"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-column gap-2 col-12 lg:col-6">
          <label htmlFor="last_name">Nom</label>
          <InputText
            type="text"
            name="last_name"
            id="last_name"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-column gap-2 col-12">
          <label htmlFor="email">Adresse email</label>
          <InputText
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-column gap-2 col-12 lg:col-6">
          <label htmlFor="password">Mot de passe</label>
          <Password
            type="password"
            name="password"
            id="password"
            toggleMask
            pt={{
              iconField: {
                root: {
                  style: { width: "100%" },
                },
              },
              input: {
                style: { width: "100%" },
              },
              root: {
                style: { width: "100%" },
              },
            }}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-column gap-2 col-12 lg:col-6">
          <label htmlFor="date_of_birth">Date de naissance</label>
          <Calendar
            value={date}
            onChange={handleDobChange}
            maxDate={new Date()}
            required
          />
        </div>

        <div className="mt-3">
          <Button style={commonStyles.primarybutton} type="submit" disabled={
            !form.email ||
            !form.password ||
            !form.first_name ||
            !form.last_name ||
            !form.date_of_birth}>
            Créer le compte
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SignupForm;
