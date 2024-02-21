import { ProductsData, Settings } from "../types/product";

export const fetchProducts = async (
  otherParams?: Settings
): Promise<ProductsData> => {
  try {
    const defaultParams = {
      per_page: "5",
    };

    const params = new URLSearchParams({
      ...defaultParams,
      ...otherParams,
    });

    const response = await fetch(
      `https://reqres.in/api/products?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const data: ProductsData = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch products: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};
