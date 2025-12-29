import { useState } from 'react';

export const useProducts = () => {
  const [data, setData] = useState([]);
  const url = "https://694a6a4e26e8707720655fd8.mockapi.io/products";

  // Fungsi buat ambil data (buat dipake Anggota A di Home)
  const gaskeunAmbilData = async () => {
    const respon = await fetch(url);
    const hasil = await respon.json();
    setData(hasil);
  };

  // Fungsi buat nambah data (buat dipake Anggota B di Admin)
  const tambahProduk = async (produkBaru) => {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produkBaru)
    });
    gaskeunAmbilData(); // Refresh data biar update
  };

  return { data, gaskeunAmbilData, tambahProduk };
};