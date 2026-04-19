import type Category from "../interfaces/category.interface";

export const getCategories = async (): Promise<Category[] | undefined> => {
      const res = await fetch("http://localhost:5000/category");
      if (!res.ok) {
        console.error(res.status);
        return;
      }
      const list = await res.json();

      return list.data
}