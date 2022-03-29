import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginTC, logoutTC } from "../bll/authReducer/authReducerThunkCreators";

const styleAppBar = {
  marginTop: "10px",
  marginBottom: "10px",
  boxShadow: `2px  2px 2px 2px rgba(0, 0, 0, 0.2),
              -2px  -2px 2px 2px rgba(0, 0, 0, 0.2),
              2px  -2px 2px 2px rgba(0, 0, 0, 0.2),
              -2px  2px 2px 2px rgba(0, 0, 0, 0.2)`,
  borderRadius: "5px",
};

type Inputs = {
  link: string;
};

export const GenerateLinkBar = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload = {
      initialLink: data.link,
    };
    dispatch(logoutTC());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={"transparent"} style={styleAppBar}>
        <Toolbar>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "90%" }}
              required
              id="Link"
              label="Link Input"
              {...register("link", { required: true })}
            />
            <Button
              style={{ marginLeft: "5px" }}
              type={"submit"}
              variant="contained"
            >
              Generate
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
