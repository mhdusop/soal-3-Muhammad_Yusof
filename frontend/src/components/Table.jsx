// src/components/Table.jsx
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllData, deleteData } from '../services/ProductService';
import Form from './Form';

function Table() {
   const [products, setProducts] = useState([]);
   const [showForm, setShowForm] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);

   useEffect(() => {
      loadItems();
   }, []);

   const loadItems = async () => {
      const fetchedProducts = await getAllData();
      setProducts(fetchedProducts);
   };

   const handleDelete = async (id) => {
      try {
         if (window.confirm("Apakah kamu yakin ingin menghapus produk ini?")) {
            await deleteData(id);
            loadItems();
            toast.success('Produk berhasil dihapus!');
         }
      } catch (error) {
         toast.error('Failed to delete the product: ' + error.message);
      }
   };

   const handleAddProduct = () => {
      setSelectedProduct(null);
      setShowForm(true);
   };

   const handleEditProduct = (product) => {
      setSelectedProduct(product);
      setShowForm(true);
   };

   return (
      <div className="container mt-4">
         <h1 className='text-center fw-semibold'>Management Inventory</h1>

         {showForm && (
            <Form
               product={selectedProduct}
               onSave={() => {
                  setShowForm(false);
                  loadItems();
               }}
            />
         )}
         <button className="btn btn-primary mb-3" onClick={handleAddProduct}>Tambah Produk Baru</button>
         <table className="table table-striped">
            <thead className="table-dark">
               <tr>
                  <th>Nama</th>
                  <th>Gambar</th>
                  <th>Kode Barang</th>
                  <th>Kategori</th>
                  <th>Stok</th>
                  <th>Harga</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {products.map(product => (
                  <tr key={product.id}>
                     <td>{product.nama}</td>
                     <td>
                        <img src={`http://localhost:8000/storage/products/${product.gambar}`} alt="" width={200} />
                     </td>
                     <td>{product.kode_barang}</td>
                     <td>{product.kategori}</td>
                     <td>{product.stok}</td>
                     <td>{product.harga}</td>
                     <td>
                        <button className="btn btn-warning me-2" onClick={() => handleEditProduct(product)}>Update</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default Table;
