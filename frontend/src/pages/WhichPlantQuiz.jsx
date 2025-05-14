import React, { useState } from 'react';

const WhichPlantQuiz = () => {
  const [answers, setAnswers] = useState({
    sunlight: '',
    water: '',
    space: '',
  });
  const [suggestion, setSuggestion] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple logic to determine the flower based on quiz answers
    let plantSuggestion = '';
    let plantImage = '';

    if (answers.sunlight === 'full' && answers.water === 'frequent' && answers.space === 'large') {
      plantSuggestion = 'You should get a Sunflower! It thrives in full sunlight and needs lots of water and space.';
      plantImage = 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';  // Sunflower image URL
    } else if (answers.sunlight === 'partial' && answers.water === 'moderate' && answers.space === 'medium') {
      plantSuggestion = 'A Lavender would be perfect for you! It loves moderate sunlight and moderate watering.';
      plantImage = 'https://www.gardenia.net/storage/app/public/uploads/images/lavender.jpg';  // Lavender image URL
    } else if (answers.sunlight === 'low' && answers.water === 'rare' && answers.space === 'small') {
      plantSuggestion = 'Try a Peace Lily! It’s perfect for low light, infrequent watering, and small spaces.';
      plantImage = 'https://www.gardenia.net/storage/app/public/uploads/images/peace-lily.jpg';  // Peace Lily image URL
    } else {
      plantSuggestion = 'Your plant needs are unique! Try exploring versatile flowers like Marigolds or Petunias!';
      plantImage = 'https://www.gardenia.net/storage/app/public/uploads/images/marigold.jpg';  // Marigold image URL
    }

    setSuggestion({ plantSuggestion, plantImage });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Which Flower is Right for You?</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#555' }}>How much sunlight does your space get?</label>
          <select name="sunlight" value={answers.sunlight} onChange={handleChange} style={{ width: '100%', padding: '10px', marginTop: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Select an option</option>
            <option value="full">Full Sun</option>
            <option value="partial">Partial Sun</option>
            <option value="low">Low Light</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#555' }}>How often can you water your plants?</label>
          <select name="water" value={answers.water} onChange={handleChange} style={{ width: '100%', padding: '10px', marginTop: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Select an option</option>
            <option value="frequent">Frequent</option>
            <option value="moderate">Moderate</option>
            <option value="rare">Rare</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#555' }}>How much space do you have?</label>
          <select name="space" value={answers.space} onChange={handleChange} style={{ width: '100%', padding: '10px', marginTop: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Select an option</option>
            <option value="small">Small Space</option>
            <option value="medium">Medium Space</option>
            <option value="large">Large Space</option>
          </select>
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>

      {/* Display the plant suggestion and image after submission */}
      {suggestion.plantSuggestion && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '5px', border: '1px solid #4CAF50' }}>
          <h2 style={{ color: '#388e3c' }}>Flower Suggestion:</h2>
          <p>{suggestion.plantSuggestion}</p>
          <img src={suggestion.plantImage} alt="Suggested Flower" style={{ width: '100%', borderRadius: '8px', marginTop: '15px' }} />
        </div>
      )}
    </div>
  );
};

export default WhichPlantQuiz;
