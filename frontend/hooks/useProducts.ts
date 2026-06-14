import { useState, useEffect } from "react";
import { getProducts, Product } from "@/services/api";

interface Params {
  category?: string;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number | null;
  sort?: string;
  page?: number;
  limit?: number;
}

export function useProducts(initialParams?: Params) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [params, setParams] = useState<Params>(
    initialParams || { page: 1, limit: 6, category: "Tất cả", sort: "default" }
  );

  useEffect(() => {
    let active = true;
    setLoading(true);

    getProducts(params)
      .then((data) => {
        if (active) {
          setProducts(data.products);
          setTotal(data.total);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [params]);

  const updateParams = (newParams: Partial<Params>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  return {
    products,
    total,
    loading,
    error,
    params,
    updateParams
  };
}
