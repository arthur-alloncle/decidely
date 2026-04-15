import ListDecisions from "./ListDecisions";
import CreateDecision from "./CreateDecision";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { getDecisions } from "../../api/decisions.api";
import type Decision from "../../interfaces/decision.interface";
import type Category from "../../interfaces/category.interface";
import { getCategories } from "../../api/category.api";

export interface Props {
  decisions?: Decision[] | undefined;
  categories?: Category[] | undefined;
}

function DecisionsDashboard() {
  const [props, setProps] = useState<Props>();

  const loadData = async () => {
    try {
      const [categories, decisions] = await Promise.all([
        getCategories(),
        getDecisions(),
      ]);

      setProps({
        categories,
        decisions,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  
  return (
    <div className="grid">
      <div className="col-3">
        <h1>Créer une décision</h1>
        <Card>
          <CreateDecision {...props} />
        </Card>
      </div>
      <div className="col-9">
        <h1>Liste des décisions</h1>
        <Card>
          <ListDecisions {...props} />
        </Card>
        <div className="col-12">
          <h1>Statistiques</h1>
          <Card>
            <p>Ce que vos décisions disent de vous</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DecisionsDashboard;
