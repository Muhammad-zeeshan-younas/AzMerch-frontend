import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import userContext from "../../utils/apis/userContext";
import { TSigninInterface } from "../../types/SigninType";
import { toast } from "react-toastify";
import { setUser, user } from "../../Redux/reducers/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

type SigninProps = {
  closeModal: () => void;
};

function Signin({ closeModal }: SigninProps) {
  const [formState, setFormState] = React.useState<TSigninInterface>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await userContext.signin(formState);

      if (!response) throw new Error("Login Failed");

      toast.success("You are now logged in.");
      dispatch(setUser({ ...response.data.user, isLoggedIn: true }));
      closeModal();
    } catch (error) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        password: "",
      }));
    }
  };

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
      <form onSubmit={handleSubmit} className="grid gap-4 py-3">
        <Grid>
          <TextField
            className="w-full"
            variant="filled"
            label="Username"
            required
            type="Email"
            value={formState.email}
            onChange={(event) => {
              setFormState({ ...formState, email: event?.target.value });
            }}
            name="username"
          />
        </Grid>
        <Grid className="relative">
          <TextField
            className="w-full"
            label="Password"
            required
            variant="filled"
            value={formState.password}
            onChange={(event) => {
              setFormState({ ...formState, password: event?.target.value });
            }}
            name="password"
            type="password"
          />
        </Grid>
        <Box display="flex" gap=".5rem" justifyContent="end">
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#101920 !important" }}
            type="submit"
          >
            sign in
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
}

export default Signin;
