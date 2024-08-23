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
  
  // Form-related states
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<TrainingType>({
    id: 0,
    type: '',
    price: 0,
    description: '',
    category: 'training', // Default value
  });

  // Update form states
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState<boolean>(false);
  const [updateFormData, setUpdateFormData] = useState<TrainingType | null>(null);

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

  const handleAddClick = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setUpdateFormData(null); // Reset update form data
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8087/trainingtypes/save', formData);
      closeForm();
      fetchTrainingItems(); // Refresh training items list
      fetchHostelItems(); // Refresh hostel items list
    } catch (error) {
      console.error('Error saving training type:', error);
      setError('Failed to save training type');
    }
  };

  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (updateFormData) {
      setUpdateFormData({ ...updateFormData, [name]: value });
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updateFormData && updateFormData.id) {
      try {
        await axios.put(`http://localhost:8087/trainingtypes/update/${updateFormData.id}`, updateFormData);
        closeForm();
        fetchTrainingItems(); // Refresh training items list
        fetchHostelItems(); // Refresh hostel items list
      } catch (error) {
        console.error('Error updating training type:', error);
        setError('Failed to update training type');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8087/trainingtypes/delete/${id}`);
      fetchTrainingItems(); // Refresh training items list
      fetchHostelItems(); // Refresh hostel items list
    } catch (error) {
      console.error('Error deleting training type:', error);
      setError('Failed to delete training type');
    }
  };

  const showUpdateForm = (item: TrainingType) => {
    setUpdateFormData(item);
    setIsUpdateFormVisible(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateFormVisible(false);
    setUpdateFormData(null);
  };

  return (
    <div className="home-training-container">
      <h1>Training and Hostel</h1>
      <button onClick={handleAddClick} className="add-button">Add</button>

      {isFormVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={closeForm}>&times;</span>
            <form className="add-training-type-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="type">Name:</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="hostel">Hostel</option>
                  <option value="training">Training</option>
                </select>
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {isUpdateFormVisible && updateFormData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={closeUpdateForm}>&times;</span>
            <form className="update-training-type-form" onSubmit={handleUpdateSubmit}>
              <div>
                <label htmlFor="type">Name:</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={updateFormData.type}
                  onChange={handleUpdateInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={updateFormData.category}
                  onChange={handleUpdateInputChange}
                  required
                >
                  <option value="hostel">Hostel</option>
                  <option value="training">Training</option>
                </select>
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={updateFormData.price}
                  onChange={handleUpdateInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={updateFormData.description}
                  onChange={handleUpdateInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}

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
                    <button onClick={() => showUpdateForm(item)}>Update</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
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
                    <button onClick={() => showUpdateForm(item)}>Update</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
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
