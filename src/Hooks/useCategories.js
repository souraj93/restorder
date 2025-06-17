import useSWR from "swr";
import axios from "axios";
import { mockCategories } from "../mock/category"; // Importing mock data

// Custom hook for fetching categories
export const useCategories = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("categories", async () => {
    // const response = await axios.get("/api/category");
    return mockCategories; // Use mock data for now
  });

  return { categories, error, isLoading };
};
