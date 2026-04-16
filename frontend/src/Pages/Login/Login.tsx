import { useState, useRef, type ChangeEvent, type SubmitEvent } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { login } from "../../api/user.api";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

interface FormState {
  email: string;
  password: string;
}

function Login() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const toast = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const body = {
      email: form.email,
      password: form.password,
    };

    login(body).then((res) => {
      //@ts-expect-error
      toast.current.show({
        severity: res.status === 200 ? "success" : "error",
        summary: res.message,
      });

      if (res.status !== 200) return;
      navigate('/decisions')

    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="text-center">
        <h1>Login</h1>
      </div>
      <div className="flex justify-content-center">
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
      </div>
    </>
  );
}

export default Login;
