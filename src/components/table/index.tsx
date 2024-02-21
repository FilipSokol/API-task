import "./styles.css";
import { Product, ProductsData } from "../../types/product";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Modal from "@mui/material/Modal";
import { useState } from "react";

type Props = {
  productsData: ProductsData | null;
};

function Table(props: Props) {
  const { productsData } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [activateData, setActivatedData] = useState<Product | null>(null);

  const products = productsData?.data
    ? Array.isArray(productsData.data)
      ? productsData.data
      : [productsData.data]
    : [];

  const handleOpen = (productData: Product) => {
    setActivatedData(productData);
    setOpen(true);
  };

  const handleClose = () => {
    setActivatedData(null);
    setOpen(false);
  };

  return (
    <section className="table">
      <TableContainer component={Paper}>
        <MuiTable>
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Nazwa</TableCell>
              <TableCell align="right">Rok</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: Product) => (
              <TableRow
                onClick={() => handleOpen(product)}
                key={product.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: product.color,
                }}
              >
                <TableCell align="right">{product.id}</TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell align="right">{product.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <Modal className="modal" open={open} onClose={handleClose}>
        <TableContainer className="modalTable" component={Paper}>
          <MuiTable>
            <TableHead>
              <TableRow>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Nazwa</TableCell>
                <TableCell align="right">Rok</TableCell>
                <TableCell align="right">Kolor</TableCell>
                <TableCell align="right">Pantone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activateData && (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: activateData.color,
                  }}
                >
                  <TableCell align="right">{activateData.id}</TableCell>
                  <TableCell align="right">{activateData.name}</TableCell>
                  <TableCell align="right">{activateData.year}</TableCell>
                  <TableCell align="right">{activateData.color}</TableCell>
                  <TableCell align="right">
                    {activateData.pantone_value}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Modal>
    </section>
  );
}

export default Table;
