import { useState } from "react";

export const useProducts = () => {
  const [data, setData] = useState([]);
  const url = "https://694a6a4e26e8707720655fd8.mockapi.io/products";

  const gaskeunAmbilData = async () => {
    try {
      const respon = await fetch(url);
      if (!respon.ok) throw new Error("Gagal fetch");
      const hasil = await respon.json();
      setData(hasil);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setData([]); // ⬅️ PENTING
      throw err;
    }
  };

  return { data, gaskeunAmbilData };
};
