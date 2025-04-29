const API_LINKURL = "https://dynamic-form-generator-9rl7.onrender.com";

export async function createUser(rollNumber, name) {
  const res = await fetch(`${API_LINKURL}/create-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rollNumber, name }),
  });
  return res.json();
}

export async function getForm(rollNumber) {
  const res = await fetch(`${API_LINKURL}/get-form?rollNumber=${rollNumber}`);
  return res.json();
}
