"use client";

import PrivateHeader from "@/components/header/PrivateHeader";
import BasicList from "@/components/sidebar/SideBar";
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUser, getUserState } from "@/store/userSlice";
import { useCookies } from "next-client-cookies";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenu, setMenu] = useState(false);
  function getMenu(): void {
    setMenu(!isMenu);
  }
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserState);
  if (!user.loggedIn) {
    dispatch(fetchUser());
  }
  return (
    <>
      <PrivateHeader handleClick={getMenu} />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              top: "55px",
              position: isMenu ? "sticky" : { xs: "block", sm: "sticky" },
              display: isMenu ? "block" : { xs: "none", sm: "block" },
            }}
          >
            <BasicList handleClick2={getMenu} />
          </Box>
        </Grid>
        <Grid item sx={{ marginTop: "10px" }} xs={11} sm={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
