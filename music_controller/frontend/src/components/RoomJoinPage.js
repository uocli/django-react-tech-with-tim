import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Grid2 as Grid, Typography } from "@mui/material";

export default function RoomJoinPage(props) {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = React.useState("");
    const [error, setError] = React.useState("");

    const handleTextFieldChange = (event) => {
        setRoomCode(event.target.value);
    };

    const roomButtonPressed = (event) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: roomCode,
            }),
        };
        fetch("/api/join-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    navigate("/room/" + roomCode);
                } else {
                    setError("Room not found.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Grid container spacing={1}>
            <Grid size={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid size={12} align="center">
                <TextField
                    error={!!error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={roomCode}
                    helperText={error}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid size={12} align="center">
                <Button variant="contained" color="primary" onClick={roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid>
            <Grid size={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}
