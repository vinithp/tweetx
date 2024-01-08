"use client";

import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserState, setUserSuccessState } from "@/store/userSlice";
import axios from "axios";

export default function Profile() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editUserName, setEditUserName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserState);

  const onSubmit = () => {
    axios
      .patch("/api/user", {
        userName,
        email,
        phoneNumber,
      })
      .then((response) => {
        console.log(response);
        dispatch(setUserSuccessState(response.data.data));
      });
  };
  useEffect(() => {
    setUserName(user.userName);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
  }, [user]);

  return (
    <Box>
      <Typography variant="h4">Profile</Typography>
      <Divider style={{ marginTop: 5, width: "100%" }} />
      <FormControl defaultValue="" required>
        <Grid
          container
          spacing={6}
          justifyContent="flex-start"
          sx={{ mb: 3, mt: 1 }}
        >
          <Grid item xs={10}>
            <AccountCircleIcon sx={{ fontSize: 100 }} />
          </Grid>
          <Grid item xs={10} sm={7}>
            <TextField
              id="standard-basic"
              fullWidth={true}
              label="username"
              variant="standard"
              value={userName}
              disabled={true}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={10} sm={7}>
            <TextField
              id="standard-basic"
              fullWidth={true}
              label="email"
              variant="standard"
              value={email}
              disabled={!editEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!editEmail ? (
                      <IconButton
                        onClick={(e) => {
                          setEditEmail(true);
                        }}
                      >
                        <ModeEditIcon />
                      </IconButton>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => {
                            onSubmit();
                            setEditEmail(false);
                          }}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setEmail(user.email);
                            setEditEmail(false);
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={10} sm={7}>
            <TextField
              id="standard-basic"
              fullWidth={true}
              label="phone"
              variant="standard"
              value={phoneNumber}
              disabled={!editPhoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!editPhoneNumber ? (
                      <IconButton
                        onClick={(e) => {
                          setEditPhoneNumber(true);
                        }}
                      >
                        <ModeEditIcon />
                      </IconButton>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => {
                            onSubmit();
                            setEditPhoneNumber(false);
                          }}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setPhoneNumber(user.phoneNumber);
                            setEditPhoneNumber(false);
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            container
            xs={10}
            sm={7}
            sx={{ mt: 1 }}
            justifyContent="space-between"
            alignItems="center"
          ></Grid>
        </Grid>
      </FormControl>
    </Box>
  );
}
