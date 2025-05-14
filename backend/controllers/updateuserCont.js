// Example: put this in the parent component or context
const updateUser = async (userData) => {
  const token = localStorage.getItem("ba61c76265bf15801ed79a36a196c621548ab85ee6b6fff0cd37106fa58ffef9d4e0ccf1a21d99bdcaa38a63e5c8e15d9a9931e3ba05c619a043943f719ace99eb1221c27fbdc628327dd2f3f7563e9c7305751b53f0760ba7cd7d98e8c41bf7b380a0cadc43a127cb691c02beaead4ed5e11af9e7bcd2eea4746b33df6393db1fb6e0215065fcc43ad50c741f8cbe70e87039a35feb018229386d224c7e4b60198b3df504e29aeb88d83a33f1a2cc56969704d7e094445a9af7e4fccbdb909d4322e47e14645356746c96e518d96932a84abadb16b639fe681a6ae91653c27f6837c7ebfff22f7b6cedaed46d133ec9dd142da3006544e43cf1e955f49fa7c0"); // or however you store JWT
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