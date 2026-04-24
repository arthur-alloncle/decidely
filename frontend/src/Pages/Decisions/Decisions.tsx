import ListDecisions from "./ListDecisions";
import CreateDecision from "./CreateDecision";
import { Card } from "primereact/card";
import type Decision from "../../interfaces/decision.interface";
import type Category from "../../interfaces/category.interface";

import { useDecisions } from "../../hooks/useDecisions";
import { useCategories } from "../../hooks/useCategories";
import { commonStyles } from "../../helpers/styles";

export interface DecisionForm {
  outcome: null | number;
  confidence: number;
  importance: number;
  title: string;
  category_id: string;
}

export interface Props {
  decisions?: Decision[];
  categories?: Category[];
}

// Submit not optional
export interface SubmitProps extends Props {
  onSubmit: (form: DecisionForm) => Promise<void>;
}

export interface ListDecisionsItemProps {
  decision: Decision
}

function DecisionsDashboard() {
  const { decisions, createDecision } = useDecisions();
  const { categories } = useCategories();

  return (
    <div className="grid flex-1">
      <div className="col-12 lg:col-3">
        <h1>Créer une décision</h1>
        <Card title="Créer une décision" style={commonStyles.card}>
          <span style={commonStyles.accent} />

          <CreateDecision categories={categories} onSubmit={createDecision} />
        </Card>
      </div>
      <div className="col-12 lg:col-9">
        <h1>Liste des décisions</h1>
        <Card title="Vos décisions" style={commonStyles.card}>
          <span style={commonStyles.accent} />

          <ListDecisions decisions={decisions} />
        </Card>
      </div>
    </div>
  );
}

export default DecisionsDashboard;
