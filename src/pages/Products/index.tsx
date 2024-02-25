import {
  Box,
  Card,
  Typography,
  CardContent,
  TablePagination,
  Container,
} from "@mui/material";
import React from "react";
import { DummyData } from "../../dummyData";
import { useNavigate } from "react-router-dom";

type Props = {};

function Index({}: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [rows, setRows] = React.useState(DummyData);
  const navigate = useNavigate();
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNavigationToProductDetails = (productId: string) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <Container>
      <Box>
        <Typography
          className="!text-xl sm:!text-2xl md:!text-4xl"
          variant="h2"
          letterSpacing=".05em"
          marginBottom="1rem"
          marginTop="2rem"
          fontWeight="bold"
        >
          Products
        </Typography>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map(({ images, name, description, price, id }) => {
            return (
              <Card
                onClick={() => {
                  handleNavigationToProductDetails(id);
                }}
                key={id}
                sx={{
                  cursor: "pointer",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                className="!transition-all !duration-300 hover:!scale-105"
              >
                <img
                  src={images[0]}
                  loading="lazy"
                  className="aspect-video w-full object-cover object-top"
                  alt=""
                />

                <CardContent>
                  <div className="grid gap-2">
                    <Typography
                      fontWeight="bold"
                      fontSize=".75rem"
                      width="max-content"
                      padding="4px 10px"
                      textAlign="center"
                      color="white"
                      borderRadius="5px"
                      sx={{ backgroundColor: "#ff7e1d" }}
                      letterSpacing=".2em"
                    >
                      AZMERCH
                    </Typography>
                    <Typography
                      className="!text-base sm:!text-lg lg:!text-xl"
                      textTransform="uppercase"
                      fontWeight="bold"
                      variant="h4"
                    >
                      {name}
                    </Typography>
                    <Typography
                      fontSize=".9rem"
                      color="#9b9e9d"
                      variant="body1"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                      fontWeight="bold"
                    >
                      {description}
                    </Typography>
                    <Typography
                      className="!text-base sm:!text-lg lg:!text-xl"
                      fontWeight="bold"
                    >
                      ${price}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {emptyRows > 0 && (
            <div style={{ height: 41 * emptyRows }}>
              <div className="col-span-3" aria-hidden />
            </div>
          )}
        </div>

        <div>
          <div className=" col-span-3">
            <TablePagination
              rowsPerPageOptions={[6, 12, 18]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </Box>
    </Container>
  );
}

export default Index;
