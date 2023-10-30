import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  closeModal,
  selectModal,
} from "../../Redux/reducers/slices/modalSlices";
import {
  Link,
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
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Sidebar from "../Sidebar/Sidebar";
import CustomModal from "../Modal/Modal";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";

const pages = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Contacts", path: "/contacts" },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

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
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const currentRoute = window.location.pathname;

  const isLinkActive = (href: string) => {
    return currentRoute === href;
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

  const isModalOpen = useSelector(selectModal);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#101920",
          width: "full",
          maxWidth: "lg",
          borderRadius: "40px",
          margin: "auto",
          marginTop: ".75rem",
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
                  <Link
                    href={path}
                    key={label}
                    sx={{
                      my: 2,
                      color: `${isLinkActive(path) ? "#F7B900" : "white"}`,
                      padding: ".65rem",
                      display: "block",
                      textDecoration: "none",
                      borderBottom: `${
                        isLinkActive(path) ? "2px solid #F7B900" : ""
                      }`,
                    }}
                  >
                    {label}
                  </Link>
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

              <Button
                name="sign-in"
                sx={{
                  backgroundColor: "#F7B900 !important",
                  borderRadius: "6px",
                  fontSize: { xs: ".75rem", md: ".9rem" },
                }}
                variant="contained"
                onClick={handleOpenModal}
              >
                sign in
              </Button>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/images/images.jpg" />
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
                ></Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
        <Sidebar closeModal={handleDrawerClose} isOpen={open} />
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
              <Signin />
            </TabPanel>
            <TabPanel value="2">
              <Signup />
            </TabPanel>
          </TabContext>
        </CustomModal>
      )}
    </>
  );
}
export default Navbar;
