import { useState } from 'react';

export const useProducts = () => {
  const [data, setData] = useState([]);
  const url = "https://694a6a4e26e8707720655fd8.mockapi.io/products";

  const gaskeunAmbilData = async () => {
    const respon = await fetch(url);
    const hasil = await respon.json();
    setData(hasil);
  };

  const tambahProduk = async (produkBaru) => {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produkBaru)
    });
    gaskeunAmbilData();
  };

  return { data, gaskeunAmbilData, tambahProduk };
};