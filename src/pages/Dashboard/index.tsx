import SingleSlide from "../../components/Carousal/SingleSlide";
import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { ArrowForward, ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PepsiAnimation from "../../animation/pepsi/Pepsi";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="space-y-4">
        <div className="flex mx-auto overflow-hidden relative h-52 sm:h-64 lg:h-96 rounded-xl">
          <img
            src="images/meteor.png"
            className="w-full object-cover"
            alt="slide show image"
          />
          <div className="absolute w-full h-full flex items-center justify-center flex-col gap-2 lg:gap-4">
            <h3 className="text-white text-lg sm:text-4xl lg:text-5xl uppercase font-bold">
              The best design you can get
            </h3>
            <p className="text-white text-xs md:text-2xl uppercase">
              What are you waiting for shop now!
            </p>
          </div>
        </div>

        <Box display="grid" marginTop="1rem" gap=".2em">
          <Typography
            className="!text-base sm:!text-lg md:!text-2xl"
            textTransform="uppercase"
            fontWeight="bold"
            color="#101920"
            component="h2"
          >
            Discover Captivating 3D Artistry That Transforms Spaces
          </Typography>
          <Typography
            className="!text-base sm:!text-md md:!text-xl"
            color="GrayText"
            fontWeight="bold"
            component="h2"
          >
            Unleash Imagination with Our Exquisite 3D Art Collection
          </Typography>
          <Typography
            className="!text-base"
            textAlign="justify"
            maxWidth="sm"
            component="p"
            letterSpacing=".05em"
            lineHeight="1.2em"
            fontWeight="500"
          >
            <b>AZMERCH</b>, we invite you to step into a world where art
            transcends the ordinary. All the images you see used in this website
            are made by us and there 3d versions are also available for purchase
          </Typography>
        </Box>
        <Button
          sx={{
            backgroundColor: "#101920 !important",
            marginTop: ".5rem",
          }}
          onClick={() => navigate("/products")}
          variant="contained"
          endIcon={<ArrowForward />}
        >
          shop now
        </Button>
      </div>
    </Container>
  );
}
export default Dashboard;
