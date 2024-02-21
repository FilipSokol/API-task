import MuiPagination from "@mui/material/Pagination";

import "./styles.css";
import { ProductsData, Settings } from "../../types/product";

type Props = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  productsData: ProductsData | null;
};

function Pagination(props: Props) {
  const { settings, setSettings, productsData } = props;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    let updatedSettings = { ...settings };
    updatedSettings["page"] = value.toString();
    setSettings(updatedSettings);
  };

  const totalPages = productsData?.total_pages || 0;

  return (
    <section className="pagination">
      {totalPages !== 0 && (
        <MuiPagination
          count={totalPages}
          onChange={handleChange}
          page={Number(settings.page)}
        />
      )}
    </section>
  );
}

export default Pagination;
