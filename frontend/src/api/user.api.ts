export const login = async (body: { email: string; password: string }) => {
  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
    return res.json();
};
