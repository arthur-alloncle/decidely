import { useEffect, useState } from "react";
import { getDecisions, postDecision } from "../api/decisions.api";
import type Decision from "../interfaces/decision.interface";

export const useDecisions = () => {
  const [decisions, setDecisions] = useState<Decision[] | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchDecisions = async () => {
    try {
      const data: Decision[] | undefined = await getDecisions();
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

      // ⚡ update optimiste
      decisions && setDecisions((prev) => [...(prev as []), newDecision]);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDecisions();
  }, []);

  return {
    decisions,
    loading,
    createDecision,
  };
};