import { useEffect, useState } from "react";
import "./App.css";
import Topbar from "./components/topbar";
import Table from "./components/table";
import { fetchProducts } from "./api/products";
import { ProductsData, Settings } from "./types/product";
import Pagination from "./components/pagination";
import Snackbar from "@mui/material/Snackbar";

function App() {
  const [settings, setSettings] = useState<Settings>({ page: "1", id: "" });
  const [productsData, setProductsData] = useState<ProductsData | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");

  const getUrlParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsToTrack = ["id", "page"];

    let updatedSettings = { ...settings };

    for (const param of paramsToTrack) {
      const value = searchParams.get(param);
      if (value !== null) {
        updatedSettings[param as keyof Settings] = value;
      }
    }

    setSettings(updatedSettings);
  };

  const loadProducts = async (params?: Settings) => {
    try {
      const fetchedProducts = await fetchProducts(params);
      setProductsData(fetchedProducts);
    } catch (error) {
      setErrorSnackbarMessage("Failed to fetch products");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    getUrlParams();
    loadProducts();
  }, []);

  useEffect(() => {
    loadProducts(settings);
  }, [settings]);

  return (
    <main className="container">
      <div className="context">
        <Topbar {...{ settings, setSettings }} />
        <Table {...{ settings, productsData }} />
        <Pagination {...{ settings, setSettings, productsData }} />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message={errorSnackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </div>
    </main>
  );
}

export default App;
