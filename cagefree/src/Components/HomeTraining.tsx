import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pawImage from '../assets/card.png';
import './HomeTraining.css';

interface TrainingType {
  id: number;
  type: string;
  price: number;
  description: string;
  category: string;
}

function HomeTraining() {
  const [trainingItems, setTrainingItems] = useState<TrainingType[]>([]);
  const [hostelItems, setHostelItems] = useState<TrainingType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainingItems();
    fetchHostelItems();
  }, []);

  const fetchTrainingItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8087/trainingtypes/getByCategory/training');
      setTrainingItems(response.data);
    } catch (error) {
      console.error('Error fetching training items:', error);
      setError('Failed to fetch training items');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHostelItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8087/trainingtypes/getByCategory/hostel');
      setHostelItems(response.data);
    } catch (error) {
      console.error('Error fetching hostel items:', error);
      setError('Failed to fetch hostel items');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-training-container">
      <h1>Training and Hostel</h1>

      <div className="training-and-hostel-columns">
        <div className="training-column">
          <h2>Training</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="training-items">
              {trainingItems.map((item) => (
                <div key={item.id} className="training-item">
                  <img src={pawImage} alt="Training" className="training-item-image" />
                  <div className="training-item-content">
                    <h3>{item.type}</h3>
                    <p>{item.description}</p>
                    <p>Price: Rs{item.price} per month</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hostel-column">
          <h2>Hostel</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="hostel-items">
              {hostelItems.map((item) => (
                <div key={item.id} className="hostel-item">
                  <img src={pawImage} alt="Hostel" className="hostel-item-image" />
                  <div className="hostel-item-content">
                    <h3>{item.type}</h3>
                    <p>{item.description}</p>
                    <p>Price: Rs{item.price} per month</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeTraining;
