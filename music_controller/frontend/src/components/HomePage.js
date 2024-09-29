import React, { useEffect, useState } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Room from "./Room";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function HomePage(props) {
    const [roomCode, setRoomCode] = useState(null);
    // const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then(({ code }) => {
                setRoomCode(code);
            });
    });

    const clearRoomCode = () => {
        setRoomCode(null);
    };

    const RenderHomePage = () => {
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
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={roomCode ? <Navigate to={`/room/${roomCode}`} /> : <RenderHomePage />} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomCode} />} />
            </Routes>
        </Router>
    );
}
