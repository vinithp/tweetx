"use client";

import { useAppDispatch } from "@/store/hooks";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUP() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const onSubmit = async () => {
    axios
      .post("/api/user", {
        userName,
        email,
        phoneNumber,
        password,
      })
      .then((response) => {
        route.push("/login");
      })
      .catch((error) => {});
  };
  return (
    <Box>
      <Grid container spacing={1} justifyContent="center">
        <Grid item container xs={10} sm={7} md={4}>
          <Paper elevation={2}>
            <FormControl defaultValue="" required>
              <Grid
                container
                spacing={1}
                justifyContent="center"
                sx={{ mb: 3, mt: 1 }}
              >
                <Grid item xs={10} sm={7}>
                  <TextField
                    id="standard-basic"
                    fullWidth={true}
                    label="username"
                    variant="standard"
                    value={userName}
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
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={10} sm={7}>
                  <TextField
                    id="standard-basic"
                    fullWidth={true}
                    label="password"
                    variant="standard"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
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
                >
                  <Grid item>
                    <Button variant="contained" onClick={onSubmit}>
                      SIGNUP
                    </Button>
                  </Grid>
                  <Grid item>
                    <Link href="/login">login</Link>
                  </Grid>
                </Grid>
              </Grid>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
