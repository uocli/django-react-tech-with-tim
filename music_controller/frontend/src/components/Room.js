import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid2 as Grid, Typography, Button } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";

export const defaultProps = {
    votesToSkip: 2,
    guestCanPause: false,
    roomCode: null,
    isHost: false,
    update: false,
    showSettings: false,
};

export default function Room(props) {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(defaultProps.votesToSkip);
    const [guestCanPause, setGuestCanPause] = useState(defaultProps.guestCanPause);
    const [isHost, setIsHost] = useState(defaultProps.isHost);
    const [showSettings, setShowSettings] = useState(defaultProps.showSettings);
    const navigate = useNavigate();
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);

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
                if (is_host) {
                    authenticateSpotify();
                }
            });
    };

    const authenticateSpotify = () => {
        fetch("/spotify/is-authenticated")
            .then((response) => response.json())
            .then((data) => {
                setSpotifyAuthenticated(data.status);
                if (!data.status) {
                    fetch("/spotify/get-auth-url")
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        });
                }
            });
    };

    const leaveRoomPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((_) => {
            props.leaveRoomCallback();
            navigate("/");
        });
    };

    const renderSettingsButton = () => {
        return (
            <Grid size={12} align="center">
                <Button variant="contained" color="primary" onClick={() => setShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    };

    const renderSettings = () => {
        return (
            <Grid container spacing={1}>
                <Grid size={12} align="center">
                    <CreateRoomPage
                        update={true}
                        votesToSkip={votesToSkip}
                        guestCanPause={guestCanPause}
                        roomCode={roomCode}
                        updateCallback={getRoomDetails}
                    />
                </Grid>
                <Grid size={12} align="center">
                    <Button variant="contained" color="secondary" onClick={() => setShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    };

    getRoomDetails();

    return showSettings ? (
        renderSettings()
    ) : (
        <Grid container spacing={1}>
            <Grid size={12} align="center">
                <Typography variant="h1" compact="h1">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid size={12} align="center">
                <Typography variant="h5" compact="h5">
                    Votes To Skip: {votesToSkip}
                </Typography>
            </Grid>
            <Grid size={12} align="center">
                <Typography variant="h5" compact="h5">
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid size={12} align="center">
                <Typography variant="h5" compact="h5">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            {isHost ? renderSettingsButton() : null}
            <Grid size={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveRoomPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    );
}
