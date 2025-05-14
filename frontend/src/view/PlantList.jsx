import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({
    name: "",
    species: "",
    health: "",
    lastWatered: "",
    lastFertilized: "",
    image: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlantId, setEditingPlantId] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/plants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlants(response.data);
      } catch (err) {
        console.error("Error fetching plants:", err);
      }
    };

    fetchPlants();
  }, []);

  const handleAddOrUpdatePlant = async () => {
    if (!newPlant.name || !newPlant.species) {
      alert("Please provide both name and species for the plant.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("name", newPlant.name);
      formData.append("species", newPlant.species);
      formData.append("health", newPlant.health || "");
      formData.append("lastWatered", newPlant.lastWatered || "");
      formData.append("lastFertilized", newPlant.lastFertilized || "");
      if (newPlant.image) formData.append("image", newPlant.image);

      if (isEditing) {
        const response = await axios.put(`/plants/${editingPlantId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setPlants(
          plants.map((plant) =>
            plant._id === editingPlantId ? response.data : plant
          )
        );
        setIsEditing(false);
        setEditingPlantId(null);
      } else {
        const response = await axios.post("/plants", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setPlants([...plants, response.data]);
      }

      setNewPlant({
        name: "",
        species: "",
        health: "",
        lastWatered: "",
        lastFertilized: "",
        image: null,
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error adding/updating plant:", err);
    }
  };

  const handleEditPlant = (plant) => {
    setIsEditing(true);
    setEditingPlantId(plant._id);
    setNewPlant({
      name: plant.name,
      species: plant.species,
      health: plant.health || "",
      lastWatered: plant.lastWatered ? plant.lastWatered.split("T")[0] : "",
      lastFertilized: plant.lastFertilized ? plant.lastFertilized.split("T")[0] : "",
      image: null,
    });
    setShowForm(true);
  };

  const handleDeletePlant = async (plantId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this plant?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/plants/${plantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPlants(plants.filter((plant) => plant._id !== plantId));
    } catch (err) {
      console.error("Error deleting plant:", err);
      alert("Failed to delete the plant.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <nav className="bg-green-900 -m-8 pt-8 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Plant Care</Link>
          </h1>
          <div className="flex space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/research-work" className="hover:underline">Research</Link>
            <Link to="/video-tutorials" className="hover:underline">Tutorials</Link>
            <Link to="/plants" className="hover:underline">Plants</Link>
            <Link to="/marketplace" className="hover:underline">Marketplace</Link>
            <Link to="/profile" className="hover:underline">User</Link>
            <Link to="/session" className="hover:underline">Session</Link>
            <Link to="/" className="hover:underline">logout</Link>
            <Link to="/notification" className="hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.002 2.002 0 0018 13V8a6 6 0 00-12 0v5a2.002 2.002 0 00-.595 1.595L5 17h5m7 0a3 3 0 11-6 0" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      <h1 className="text-3xl font-bold mt-16 text-center mb-6">My Plants</h1>

      <div className="text-center mb-6">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false);
            setNewPlant({
              name: "",
              species: "",
              health: "",
              lastWatered: "",
              lastFertilized: "",
              image: null,
            });
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showForm ? "Close Form" : "Add Plant"}
        </button>
      </div>

      {showForm && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Plant" : "Add a New Plant"}
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700">Plant Name</label>
            <input
              type="text"
              value={newPlant.name}
              onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Species</label>
            <input
              type="text"
              value={newPlant.species}
              onChange={(e) => setNewPlant({ ...newPlant, species: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Plant Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewPlant({ ...newPlant, image: e.target.files[0] })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Watered</label>
            <input
              type="date"
              value={newPlant.lastWatered}
              onChange={(e) => setNewPlant({ ...newPlant, lastWatered: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Fertilized</label>
            <input
              type="date"
              value={newPlant.lastFertilized}
              onChange={(e) => setNewPlant({ ...newPlant, lastFertilized: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddOrUpdatePlant}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {isEditing ? "Update Plant" : "Add Plant"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <div key={plant._id} className="bg-white p-4 rounded-lg shadow">
            {plant.imageUrl && (
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-lg font-bold">{plant.name}</h3>
            <p>Species: {plant.species}</p>
            <p>Health: {plant.health || "Healthy"}</p>
            <p>Last Watered: {plant.lastWatered ? new Date(plant.lastWatered).toISOString().split('T')[0] : "Not yet"}</p>
            <p>Last Fertilized: {plant.lastFertilized ? new Date(plant.lastFertilized).toISOString().split('T')[0] : "Not yet"}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEditPlant(plant)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePlant(plant._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantList;
