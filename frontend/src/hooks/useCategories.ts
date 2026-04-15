import { useEffect, useState } from "react";
import { getCategories } from "../api/category.api";
import type Category from "../interfaces/category.interface";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[] | undefined>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return { categories };
};