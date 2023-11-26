import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import userContxt from "../../utils/apis/userContext";
import { toast } from "react-toastify";
import { TSignupInterface } from "../../types/SignupType";
import CustomDropzone from "../../components/Dropzone/Dropzone";

type Props = {};

function Signup({}: Props) {
  const [formState, setFormState] = useState<TSignupInterface>({
    username: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState<FileList | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", formState.username);
    formData.append("email", formState.email);
    formData.append("password", formState.password);
    if (file) {
      formData.append("avatar", file[0]);
    }

    try {
      const response = await userContxt.signup(formData);
      if (!response) throw Error;
      toast.success("Congrats! You are now registered.");
    } catch (err) {}
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
        Sign up
      </Typography>
      <form className="grid gap-4 py-3" onSubmit={handleSubmit}>
        <Grid>
          <TextField
            className="w-full"
            value={formState.username}
            variant="filled"
            label="Full Name"
            type="text"
            required
            onChange={(event) =>
              setFormState({ ...formState, username: event.target.value })
            }
            name="fullName"
          />
        </Grid>
        <Grid>
          <TextField
            className="w-full"
            variant="filled"
            label="Email"
            required
            type="email"
            value={formState.email}
            onChange={(event) =>
              setFormState({ ...formState, email: event.target.value })
            }
            name="email"
          />
        </Grid>
        <Grid className="relative">
          <TextField
            className="w-full"
            label="Password"
            variant="filled"
            required
            name="password"
            type="password"
            value={formState.password}
            onChange={(event) =>
              setFormState({ ...formState, password: event.target.value })
            }
          />
        </Grid>
        <CustomDropzone files={file} setFiles={setFile} />

        <Box display="flex" gap=".5rem" justifyContent="end">
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#101920 !important" }}
            type="submit"
          >
            sign up
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
}

export default Signup;
