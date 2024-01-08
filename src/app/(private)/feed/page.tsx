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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllFeeds, getAllFeed } from "@/store/feedSlice";
import { getUserState } from "@/store/userSlice";

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

export default function FeedCompnent() {
  const [isCreate, setCreate] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [allPost, setAllPost] = useState<
    { userName: string; date: string; post: string }[]
  >([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserState);
  const onSubmit = () => {
    axios
      .post("/api/feeds", { userName: user.userName, post: newPost })
      .then((response) => {
        dispatch(fetchAllFeeds());
      });
    setCreate(false);
  };
  useEffect(() => {
    dispatch(fetchAllFeeds());
  }, []);
  const allPosts = useAppSelector(getAllFeed);
  useEffect(() => {
    setAllPost(allPosts.feeds);
  }, [allPosts]);

  const finalRes = allPost.map((item) => {
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
          <Grid item justifySelf="left">
            <IconButton>
              <AccountCircleIcon sx={{ zIndex: -1 }} fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item sm={10} justifySelf="left">
            <Typography sx={{ fontWeight: 500, fontSize: 17 }} component="p">
              {item.userName}
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 10 }} component="p">
              {item.date}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography sx={{ fontWeight: 500, fontSize: 16 }} component="p">
              {item.post}
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
          <Typography variant="h4">Feeds</Typography>
          <Divider style={{ marginTop: 5, width: "100%" }} />
        </Grid>
        {isCreate ? (
          <Grid item xs={10}>
            <Typography sx={{ fontSize: 14, my: 0.5 }}>New Post</Typography>
            <textarea
              style={{ width: "100%" }}
              rows={3}
              placeholder="post..."
              onChange={(e) => {
                setNewPost(e.target.value);
              }}
            />
            <Button
              sx={{ float: "right" }}
              size="small"
              variant="outlined"
              onClick={onSubmit}
            >
              Post
            </Button>
            <Divider light={false} style={{ marginTop: 40 }} />
          </Grid>
        ) : (
          ""
        )}
        {finalRes}
      </Grid>
      <Box sx={{ right: "5%", bottom: "5%", position: "fixed" }}>
        <IconButton
          onClick={() => {
            setCreate(!isCreate);
          }}
        >
          <AddCircleOutlineIcon color="primary" fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
