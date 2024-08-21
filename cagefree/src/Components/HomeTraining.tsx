import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeTraining.css';
import pawImage from '../assets/card.png'; // Importing the image

interface TrainingType {
  id: number;
  type: string;
  price: number;
  description: string;
}

function HomeTraining() {
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainingTypes();
  }, []);

  const fetchTrainingTypes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8087/trainingtypes/getAll');
      setTrainingTypes(response.data);
    } catch (error) {
      console.error('Error fetching training types:', error);
      setError('Failed to fetch training types');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-training-container">
      <h1>Training Type Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="training-type-box">
          {trainingTypes.map((type) => (
            <div key={type.id} className="training-type-item">
              <img src={pawImage} alt="Training" className="training-type-item-image" />
              <div className="training-type-item-content">
                <h3>{type.type}</h3>
                <p>{type.description}</p>
                <p>Price: ${type.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeTraining;
