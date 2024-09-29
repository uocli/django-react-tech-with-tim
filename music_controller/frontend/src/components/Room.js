import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Button, Link } from "@material-ui/core";

export default function Room(props) {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const navigate = useNavigate();

    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode)
            .then((response) => {
                if (!response.ok) {
                    props.leaveRoomCallback();
                    navigate("/");
                }
                return response.json();
            })
            .then(({ votes_to_skip, guest_can_pause, is_host }) => {
                setVotesToSkip(votes_to_skip);
                setGuestCanPause(guest_can_pause);
                setIsHost(is_host);
            });
    };

    const leaveRoomPressed = (event) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((_) => {
            props.leaveRoomCallback();
            navigate("/");
        });
    };

    getRoomDetails();

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h1" compact="h1">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5" compact="h5">
                    Votes To Skip: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5" compact="h5">
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5" compact="h5">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveRoomPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    );
}
