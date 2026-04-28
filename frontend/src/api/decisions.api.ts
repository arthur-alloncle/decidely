import type Decision from "../interfaces/decision.interface";

export const getDecisions = async (page: number, limit: number) => {
  const res = await fetch(`http://localhost:5000/decision/list?limit=${limit}&page=${page}`, {
    credentials: "include",
  });
  if (!res.ok) {
    return;
  }
  const list = await res.json();
  

  return list;
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