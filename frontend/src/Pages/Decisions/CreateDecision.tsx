import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import type { DecisionForm, SubmitProps } from "./Decisions";

function CreateDecision({ categories, onSubmit }: SubmitProps) {
  const [decisionForm, setDecisionForm] = useState<DecisionForm>({
    outcome: null,
    confidence: 0,
    importance: 0,
    category_id: "",
    title: "",
  });

   const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(decisionForm);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setDecisionForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-column gap-2 mt-3">
          <label htmlFor="title">Titre</label>
          <InputText
            type="text"
            name="title"
            id="title"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-column gap-2 mt-3">
          <label htmlFor="category">Catégorie</label>
          <Dropdown
            value={decisionForm.category_id}
            onChange={(e) =>
              setDecisionForm({ ...decisionForm, category_id: e.value })
            }
            options={categories}
            optionLabel="display_name"
            required
            optionValue="id"
            placeholder="Sélectionnez une option"
          />
        </div>
        <div className="flex flex-column gap-2 mt-3">
          <label htmlFor="confidence">Niveau de confiance</label>
          <InputText
            type="text"
            name="confidence"
            required
            id="confidence"
            onChange={handleChange}
          />
          <small>Entre 1 et 10</small>
        </div>
        <div className="flex flex-column gap-2 mt-3">
          <label htmlFor="importance">Impact de la décision</label>
          <InputText
            type="text"
            name="importance"
            required
            id="importance"
            onChange={handleChange}
          />
          <small>Entre 1 et 4</small>
        </div>

        <div className="mt-3">
          <Button type="submit">Envoyer</Button>
        </div>
      </form>
    </>
  );
}

export default CreateDecision;
