import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    if (!itemName) return;
    try {
      const response = await axios.post('http://localhost:5000/items', { name: itemName });
      setItems([...items, response.data]);
      setItemName('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h1>MERN Vite Example</h1>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Add Item"
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
