import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  closeModal,
  selectModal,
} from "../../Redux/reducers/slices/modalSlices";
import { cart } from "../../Redux/reducers/slices/cartSlice";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  Button,
  Tab,
  MenuItem,
  ListItemText,
  Badge,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Sidebar from "../Sidebar/Sidebar";
import CustomModal from "../Modal/Modal";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";
import { config } from "../../utils/config/config";
import { useNavigate } from "react-router-dom";
import { ShoppingCartCheckout } from "@mui/icons-material";
import CustomCart from "../Cart";
import userContxt from "../../utils/apis/userContext";
import { setUser, user } from "../../Redux/reducers/slices/userSlice";
import { UserState } from "../../types/userType";

const pages = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
];

function Navbar() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#36454F",
      },
    },
  });
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const [isCartVisible, setIsCartVisible] = React.useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const LoggedinUser = useSelector(user).isLoggedIn;
  const User = useSelector(user);
  const Cart = useSelector(cart);
  const isModalOpen = useSelector(selectModal);
  const dispatch = useDispatch();
  const currentRoute = window.location.pathname;

  const navigate = useNavigate();

  const isLinkActive = (href: string) => {
    return currentRoute === href;
  };

  const handleLogout = () => {};

  const handleCartOpen = () => {
    setIsCartVisible(true);
  };

  const handleCartClose = () => {
    setIsCartVisible(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const settings = [
    { name: "Change profile", onClick: () => {} },
    {
      name: "Logout",
      onClick: () => {
        userContxt.signOut();
        dispatch(
          setUser({
            id: "",
            username: "",
            email: "",
            isLoggedIn: false,
            avatar: "",
          })
        );
        handleCloseUserMenu();
      },
    },
  ];

  return (
    <>
      <AppBar
        position="static"
        color="default"
        sx={{
          width: "full",
          margin: "auto",
          marginBottom: ".75rem",
        }}
        elevation={1}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              padding: "0 1.2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              AZMERCH
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: "1.4rem" }}>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: "1rem",
                }}
              >
                {pages.map(({ label, path }) => (
                  <a
                    onClick={() => {
                      navigate(path);
                    }}
                    className={`cursor-pointer p-2
                      ${
                        isLinkActive(path)
                          ? "border-b-2 border-black text-black"
                          : ""
                      }`}
                    key={label}
                  >
                    {label}
                  </a>
                ))}
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerOpen}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              {!LoggedinUser && (
                <Button
                  name="sign-in"
                  sx={{
                    backgroundColor: "#101920 !important",
                    borderRadius: "6px",
                    fontSize: { xs: ".75rem", md: ".9rem" },
                  }}
                  variant="contained"
                  onClick={handleOpenModal}
                >
                  sign in
                </Button>
              )}

              {LoggedinUser && (
                <>
                  <IconButton onClick={handleCartOpen}>
                    <Badge badgeContent={Cart.length} color="warning">
                      <ShoppingCartCheckout color="action" />
                    </Badge>
                  </IconButton>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src={`${config().backend_url}/${User.avatar}`}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting.name} onClick={setting.onClick}>
                          <ListItemText>{setting.name}</ListItemText>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
        <Sidebar closeModal={handleDrawerClose} isOpen={open} />
        <CustomCart closeModal={handleCartClose} isOpen={isCartVisible} />
      </AppBar>
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen.isOpen} closeModal={handleCloseModal}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <ThemeProvider theme={theme}>
                <TabList
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{ display: "flex", flexGrow: 1 }}
                    label="Sign in"
                    value="1"
                  />
                  <Tab
                    sx={{ display: "flex", flexGrow: 1 }}
                    label="Sign up"
                    value="2"
                  />
                </TabList>
              </ThemeProvider>
            </Box>
            <TabPanel value="1">
              <Signin closeModal={handleCloseModal} />
            </TabPanel>
            <TabPanel value="2">
              <Signup setTabValue={setValue} />
            </TabPanel>
          </TabContext>
        </CustomModal>
      )}
    </>
  );
}
export default Navbar;
