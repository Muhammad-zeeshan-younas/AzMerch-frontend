import {
  Backdrop,
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  styled,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { cart } from "../../Redux/reducers/slices/cartSlice";
import { clearCart } from "../../Redux/reducers/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type Props = {
  closeModal: () => void;
  isOpen: boolean;
};

function CustomCart({ isOpen, closeModal }: Props) {
  const drawerWidth = 350;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(cart);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    fontSize: "1.4rem",
    fontFamily: "monospace",
    background: "#101920",
    fontWeight: 700,
    color: "white",
    width: "100%",
    letterSpacing: ".3rem",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center",
  }));

  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer - 1,
        background: "031120",
      }}
      open={isOpen}
      onClick={closeModal}
    >
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="right"
        open={isOpen}
      >
        <DrawerHeader>CHECKOUT</DrawerHeader>
        <Divider />
        {cartItems.length === 0 && (
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center", paddingTop: "1rem" }}
          >
            Your cart is empty
          </Typography>
        )}

        {cartItems.length > 0 && (
          <div className="grid gap-2 overflow-y-auto px-4 py-4">
            {cartItems.map((item) => (
              <Box display="flex" gap={1} paddingBottom={1} borderBottom={1}>
                <img
                  src={item.image}
                  width={50}
                  height={50}
                  className="rounded-xl"
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  sx={{ padding: ".3em 0" }}
                  flexGrow={"1"}
                >
                  <Typography fontSize="1.5rem" fontWeight="600" variant="h2">
                    {item.items.name}
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="caption" sx={{ fontSize: ".85rem" }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: ".85rem" }}>
                      <span className="text-orange-400 font-bold">$</span>{" "}
                      {item.totalPrice}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 w-full px-4 py-2 grid gap-2">
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Total price
            </Typography>
            <Button
              sx={{
                background: "#fb923c",
                color: "white",
              }}
              variant="contained"
              fullWidth
              onClick={() => {
                dispatch(clearCart());
                toast.success("Thanks for paticipating in the demo");
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </Drawer>
    </Backdrop>
  );
}

export default CustomCart;
