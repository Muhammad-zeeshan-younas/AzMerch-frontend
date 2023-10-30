import {
  Backdrop,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { Home, ContactMail, Store } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {
  closeModal: () => void;
  isOpen: boolean;
};

function Sidebar({ closeModal, isOpen }: Props) {
  const drawerWidth = 240;
  const currentRoute = window.location.pathname;
  const navigate = useNavigate();

  const isLinkActive = (href: string) => {
    return currentRoute === href;
  };

  const routes = [
    { label: "Home", path: "/", icon: <Home /> },
    {
      label: "Products",
      path: "/products",
      icon: <Store />,
    },
    {
      label: "Contacts",
      path: "/contacts",
      icon: <ContactMail />,
    },
  ];

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    fontSize: "1.4rem",
    fontFamily: "monospace",
    background: "#031120",
    fontWeight: 700,
    color: "white",
    width: "100%",
    letterSpacing: ".3rem",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center",
  }));

  const Navigate = (path: string) => {
    navigate(path);
  };

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
        anchor="left"
        open={isOpen}
      >
        <DrawerHeader>AZMERCH</DrawerHeader>
        <Divider />
        <List>
          {routes.map(({ label, path, icon }) => (
            <ListItem
              key={label}
              sx={{
                marginBlockStart: ".2rem",
              }}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  Navigate(path);
                }}
                sx={{
                  backgroundColor: `${
                    isLinkActive(path) ? "#1b2838" : " transparent"
                  }`,
                  borderBottom: `${
                    isLinkActive(path) ? "4px solid #F7B900" : " transparent"
                  }`,

                  "&:hover": {
                    backgroundColor: `${isLinkActive(path) ? "#1b2838" : ""}`,
                  },

                  color: `${isLinkActive(path) ? "white" : ""}`,
                }}
              >
                <ListItemIcon
                  sx={{
                    width: "20px",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    color: `${isLinkActive(path) ? "white" : ""}`,
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Backdrop>
  );
}

export default Sidebar;
