import type Decision from "../interfaces/decision.interface";

export const getDecisions = async () => {
  const res = await fetch("http://localhost:5000/decision/list", {
    credentials: "include",
  });
  if (!res.ok) {
    return;
  }
  const list = await res.json();
  let formated: Decision[] = [];

  list.data.map((decision: Decision) => {
    formated.push({
      ...decision
    });
  });
  return formated;
};

export const postDecision = async (body: BodyInit | null | undefined) => {
    const res = await fetch("http://localhost:5000/decision/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res.json()
}

export const updateDecisionOutcome = async (body: BodyInit | null | undefined) => {
  const res = await fetch("http://localhost:5000/decision/updateOutcome", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res.json()
}