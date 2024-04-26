import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { createData, updateData } from '../services/ProductService';

function ProductForm({ product, onSave }) {
   const [formData, setFormData] = useState({
      nama: '',
      kode_barang: '',
      kategori: '',
      stok: '',
      harga: '',
      gambar: null,
   });

   useEffect(() => {
      if (product) {
         setFormData({
            ...product,
            gambar: null,
         });
      }
   }, [product]);

   const validateForm = () => {
      if (!formData.nama.trim() || formData.nama.trim().length < 3 || formData.nama.trim().length > 255) {
         toast.error("Nama harus diisi, minimal 3 karakter.");
         return false;
      }
      if (!formData.kode_barang.trim()) {
         toast.error("Kode Barang wajib diisi.");
         return false;
      }
      if (!formData.kategori) {
         toast.error("Kategori wajib dipilih.");
         return false;
      }
      if (!formData.stok || isNaN(formData.stok)) {
         toast.error("Stok wajib diisi dan harus angka.");
         return false;
      }
      if (!formData.harga || isNaN(formData.harga)) {
         toast.error("Harga wajib diisi dan harus angka.");
         return false;
      }
      if (!formData.gambar) {
         toast.error("Gambar wajib diisi.");
         return false;
      }
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(formData.gambar.type)) {
         toast.error("Format gambar harus jpg, jpeg, atau png.");
         return false;
      }
      if (formData.gambar.size > 2097152) { // 2MB
         toast.error("Gambar tidak boleh lebih dari 2MB.");
         return false;
      }
      return true;
   };

   const handleChange = (e) => {
      const { name, value, files } = e.target;
      setFormData(prevFormData => ({
         ...prevFormData,
         [name]: files && files.length > 0 ? files[0] : value
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) {
         return;
      }

      const dataToSend = new FormData();
      Object.keys(formData).forEach(key => {
         dataToSend.append(key, formData[key]);
      });

      try {
         if (product) {
            await updateData(product.id, dataToSend);
         } else {
            await createData(dataToSend);
         }
         toast.success('Produk berhasil disimpan.');
         onSave();
      } catch (error) {
         toast.error("Gagal menyimpan produk.");
      }
   };

   return (
      <form onSubmit={handleSubmit} className="needs-validation">
         <div className="row">
            <div className="col-6">
               <div className="mb-3">
                  <label htmlFor="nama" className="form-label">Nama Produk</label>
                  <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} className="form-control" placeholder="Product Name" />
               </div>
            </div>
            <div className="col-6">
               <div className="mb-3">
                  <label htmlFor="kode_barang" className="form-label">Kode Produk</label>
                  <input type="text" id="kode_barang" name="kode_barang" value={formData.kode_barang} onChange={handleChange} className="form-control" placeholder="Product Code" />
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-6">
               <div className="mb-3">
                  <label htmlFor="kategori" className="form-label">Kategori</label>
                  <select id="kategori" name="kategori" value={formData.kategori} onChange={handleChange} className="form-select">
                     <option value="">Pilih Kategori</option>
                     <option value="Kategori 1">Kategori 1</option>
                     <option value="Kategori 2">Kategori 2</option>
                     <option value="Kategori 3">Kategori 3</option>
                  </select>
               </div>
            </div>
            <div className="col-6">
               <div className="mb-3">
                  <label htmlFor="stok" className="form-label">Stok</label>
                  <input type="number" id="stok" name="stok" value={formData.stok} onChange={handleChange} className="form-control" placeholder="Stock" />
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-6">
               <div className="mb-3">
                  <label htmlFor="harga" className="form-label">Harga</label>
                  <input type="number" id="harga" name="harga" value={formData.harga} onChange={handleChange} className="form-control" placeholder="Price" />
               </div>
            </div>
            <div className="col-6">
               <div className="mb-3">
                  <label htmlFor="gambar" className="form-label">Gambar</label>
                  <input type="file" id="gambar" name="gambar" onChange={handleChange} className="form-control" />
               </div>
            </div>
         </div>
         <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success">Simpan Produk</button>
         </div>
      </form>

   );
}

export default ProductForm;