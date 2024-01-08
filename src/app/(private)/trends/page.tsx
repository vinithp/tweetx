"use client";

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import axios from "axios";

const arr = [
  {
    name: "name1",
    date: "02/05/2022",
    post: "this is just a post written to test and not to worry about it",
  },
  {
    name: "name2",
    date: "02/06/2022",
    post: "this is just a post written to test and not to worry about it test and not to worry about it",
  },
  { name: "name3", date: "02/07/2022", post: "this is just a post writte" },
  {
    name: "name4",
    date: "02/08/2022",
    post: "this is just a post written to test and not to worry",
  },
];

export default function TrendCompnent() {
  const [trends, setTrends] = useState<any>([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        headers: {
          // "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
          // "Access-Control-Allow-Headers":
          //   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      })
      .then((response) => {
        setTrends(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const finalRes = trends.map((item: any) => {
    return (
      <>
        <Grid
          item
          container
          xs={12}
          sm={10}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={10} justifySelf="left">
            <Typography sx={{ fontWeight: 600, fontSize: 17 }} component="p">
              {item.title}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography sx={{ fontWeight: 500, fontSize: 16 }} component="p">
              {item.body}
            </Typography>
          </Grid>
          <Divider style={{ marginTop: 5, width: "100%" }} />
        </Grid>
      </>
    );
  });
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h4">Trending</Typography>
          <Divider style={{ marginTop: 5, width: "100%" }} />
        </Grid>
        {finalRes}
      </Grid>
    </Box>
  );
}
