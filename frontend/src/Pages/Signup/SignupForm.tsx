import { useState, type ChangeEvent, type FormEvent, type SubmitEvent, type SyntheticEvent } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import type { FormState, Props } from "./Signup";
import { Calendar, type CalendarProps } from "primereact/calendar";
        

function SignupForm({ onSubmit }: Props) {
  const [form, setForm] = useState<FormState>({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: null,
    password: ""
  });

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    onSubmit(form);
  };

  const [date, setDate] = useState(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Any here
  const handleDobChange = (e: any) => {
    setDate(e.value)
    setForm((prev) => ({
      ...prev,
      date_of_birth: e.value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-column gap-2">
        <label htmlFor="first_name">Prénom</label>
          <InputText
            type="text"
            name="first_name"
            id="first_name"
            onChange={handleChange}
          />
      </div>
      <div className="flex flex-column gap-2">
        <label htmlFor="last_name">Nom</label>
          <InputText
            type="text"
            name="last_name"
            id="last_name"
            onChange={handleChange}
          />
      </div>
      <div className="flex flex-column gap-2">
        <label htmlFor="date_of_birth">Date de naissance</label>
          <Calendar value={date} onChange={handleDobChange} maxDate={new Date()} />
      </div>
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

export default SignupForm;
