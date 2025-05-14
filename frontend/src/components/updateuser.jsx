// Example: put this in the parent component or context
const updateUser = async (userData) => {
  const token = localStorage.getItem("token"); // or however you store JWT
  const response = await fetch("/api/users/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to update profile");
  }
  return response.json();
};