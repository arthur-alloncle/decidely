import ListDecisions from "./ListDecisions";
import CreateDecision from "./CreateDecision";
import { Card } from "primereact/card";
import type Decision from "../../interfaces/decision.interface";
import type Category from "../../interfaces/category.interface";
import { Paginator, type PaginatorChangeEvent } from "primereact/paginator";

import { useDecisions } from "../../hooks/useDecisions";
import { useCategories } from "../../hooks/useCategories";
import { commonStyles } from "../../helpers/styles";
import { useState } from "react";
import type { DecisionResponse } from "../../interfaces/decision.interface";

export interface DecisionForm {
  outcome: null | number;
  confidence: number;
  importance: number;
  title: string;
  category_id: string;
}

export interface Props {
  decisions?: DecisionResponse;
  categories?: Category[];
  putDecisionOutcome?: (body: { outcome: number; id: string }) => Promise<void>;
}

// Submit can't be optional
export interface SubmitProps extends Props {
  onSubmit: (form: DecisionForm) => Promise<void>;
}

export interface ListDecisionsItemProps {
  decision: Decision;
}

function DecisionsDashboard() {
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const { decisions, createDecision, putDecisionOutcome, fetchDecisions } =
    useDecisions(first, rows);
  const { categories } = useCategories();

  const onPageChange = (event: any) => {
    console.log(event);

    setFirst(event.first);
    setRows(event.rows);

    fetchDecisions(event.page, event.rows);
  };

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

          <ListDecisions
            decisions={decisions}
            putDecisionOutcome={putDecisionOutcome}
          />
           <Paginator first={first} 
           rows={decisions?.pagination.pageSize}
           totalRecords={decisions?.pagination.total} 
           rowsPerPageOptions={[10, 20, 30]} 
           onPageChange={onPageChange} />
        </Card>
      </div>
    </div>
  );
}

export default DecisionsDashboard;
