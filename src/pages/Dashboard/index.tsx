import SingleSlide from "../../components/Carousal/SingleSlide";
import { Box, Button, Typography } from "@mui/material";

function Dashboard() {
  return (
    <div className="space-y-4">
      <SingleSlide />

      <Box display="grid" marginTop="1rem" gap=".2em">
        <Typography
          sx={{ fontSize: { sm: "1.4rem", lg: "1.67rem" } }}
          textTransform="uppercase"
          fontWeight="bold"
          color="#101920"
          component="h2"
        >
          Discover Captivating 3D Artistry That Transforms Spaces
        </Typography>
        <Typography
          sx={{ fontSize: { sm: "1.2rem", lg: "1.4rem" } }}
          color="GrayText"
          fontWeight="bold"
          component="h2"
        >
          Unleash Imagination with Our Exquisite 3D Art Collection
        </Typography>
        <Typography
          sx={{ fontSize: "1rem" }}
          textAlign="justify"
          maxWidth="sm"
          component="p"
          letterSpacing=".05em"
          lineHeight="1.2em"
          fontWeight="500"
        >
          At <b>AZMERCH</b>, we invite you to step into a world where art
          transcends the ordinary. We are passionate art enthusiasts who believe
          that your living spaces should be an expression of your individuality.
          Our journey began with a simple vision: to infuse life and wonder into
          your surroundings through mesmerizing 3D art.
        </Typography>
      </Box>
      <Button
        sx={{
          backgroundColor: "#101920 !important",
          marginTop: ".5rem",
        }}
        variant="contained"
      >
        shop now
      </Button>
    </div>
  );
}
export default Dashboard;
