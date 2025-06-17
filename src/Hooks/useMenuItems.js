import useSWR from "swr";
import axios from "axios";
import { mockMenuItems } from "../mock/menu"; // Importing mock data

// Custom hook for fetching categories
export const useMenuItems = () => {
  const {
    data: menuItems,
    error,
    isLoading,
  } = useSWR("menuItems", async () => {
    // const response = await axios.get("/api/menu");
    return mockMenuItems; // Use mock data for now
  });

  return { menuItems, error, isLoading };
};
