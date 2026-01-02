import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../services/api";

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} className="max-w-md mb-4" />
      <p>{product.description}</p>
    </main>
  );
}
