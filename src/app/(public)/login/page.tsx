"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  setUserloadingState,
  setUserSuccessState,
  setUserfailedState,
} from "@/store/userSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPop, setShowPop] = useState(false);
  const dispatch = useAppDispatch();
  const route = useRouter();

  const onSubmit = async () => {
    dispatch(setUserloadingState());
    await axios
      .post("/api/login", {
        userName,
        password,
      })
      .then((response) => {
        dispatch(setUserSuccessState(response.data.data));
        route.push("/feed");
      })
      .catch((error) => {
        dispatch(setUserfailedState());
        setShowPop(true);
      });
  };

  return (
    <Box>
      <Snackbar
        open={showPop}
        onClose={() => {
          setShowPop(false);
        }}
        autoHideDuration={6000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          incurrect userName/password
        </Alert>
      </Snackbar>
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
                >
                  <Grid item>
                    <Button variant="contained" onClick={onSubmit}>
                      LOGIN
                    </Button>
                  </Grid>
                  <Grid item alignSelf="center">
                    <Link href="/signup">signup</Link>
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
