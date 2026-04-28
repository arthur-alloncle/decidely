import { useEffect, useState } from "react";
import {
  getDecisions,
  postDecision,
  updateDecisionOutcome,
} from "../api/decisions.api";
import type Decision from "../interfaces/decision.interface";
import type { DecisionForm } from "../Pages/Decisions/Decisions";
// import type { DecisionResponse } from "../interfaces/decision.interface";

export interface DecisionResponse {
  data: Decision[];
  pagination: { pageNumber: number; pageSize: number; total: number };
  status: any;
}

export const useDecisions = (first: number, rows: number) => {
  const [decisions, setDecisions] = useState<DecisionResponse | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchDecisions = async (page: number, limit: number) => {
    try {
      const data: DecisionResponse | undefined = await getDecisions(
        page,
        limit,
      );
      setDecisions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createDecision = async (form: any) => {
    try {
      const newDecision = await postDecision(form);
      fetchDecisions(0, rows)


      // setDecisions((prev) => {
      //   console.log(prev);
        
      //   if (!prev) return prev;

      //   return {
      //     ...prev,
      //     data: [...prev.data, newDecision],
      //   };
      // });
    } catch (err) {
      console.error(err);
    }
  };

  const putDecisionOutcome = async (body: any) => {
    try {
      updateDecisionOutcome(body).then((res) => {
        return res.json();
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDecisions(first, rows);
  }, []);

  return {
    decisions,
    loading,
    fetchDecisions,
    createDecision,
    putDecisionOutcome,
  };
};
