import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Room from "./Room";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const renderHomePage = (props) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button disableElevation variant="contained" color="primary" to="/join" component={Link}>
                    Join a Room
                </Button>
                <Button variant="contained" color="secondary" to="/create" component={Link}>
                    Create a Room
                </Button>
            </Grid>
        </Grid>
    );
};

export default function HomePage(props) {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={renderHomePage} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </Router>
    );
}
