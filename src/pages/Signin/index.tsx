import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

function Signin() {
  return (
    <React.Fragment>
      <Typography
        variant="h2"
        fontWeight="bold"
        textAlign="center"
        fontSize="1.75rem"
        textTransform="uppercase"
      >
        Sign in
      </Typography>
      <form className="grid gap-4 px-4 py-3">
        <Grid>
          <TextField
            className="w-full"
            variant="filled"
            label="Username"
            type="Email"
            name="username"
          />
        </Grid>
        <Grid className="relative">
          <TextField
            className="w-full"
            label="Password"
            variant="filled"
            name="password"
            type="password"
          />
        </Grid>
        <Box display="flex" gap=".5rem" justifyContent="end">
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#101920" }}
          >
            sign in
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
}

export default Signin;
