// src/components/Items.js
import { useEffect, useState } from 'react';
import { fetchData, createData, updateData, deleteData } from './../services/ProductService';

function Items() {
   const [items, setItems] = useState([]);

   useEffect(() => {
      const loadItems = async () => {
         const itemsFromServer = await fetchData();
         setItems(itemsFromServer);
      };
      loadItems();
   }, []);

   const addItem = async () => {
      const newItem = await createData({ name: "New Item", value: "100" });
      setItems([...items, newItem]);
   };

   const updateItem = async (id) => {
      const updatedItem = await updateData(id, { name: "Updated Item", value: "200" });
      setItems(items.map(item => item.id === id ? updatedItem : item));
   };

   const deleteItem = async (id) => {
      await deleteData(id);
      setItems(items.filter(item => item.id !== id));
   };

   return (
      <div>
         <h1>Items</h1>
         <ul>
            {items.map(item => (
               <li key={item.id}>
                  {item.name} - {item.value}
                  <button onClick={() => updateItem(item.id)}>Update</button>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
               </li>
            ))}
         </ul>
         <button onClick={addItem}>Add Item</button>
      </div>
   );
}

export default Items;
