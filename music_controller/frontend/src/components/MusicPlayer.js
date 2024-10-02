import React, { useState } from "react";
import { Grid2 as Grid, Typography, IconButton, Slider, Card, LinearProgress } from "@mui/material";
import { PlayArrow, SkipNext, SkipPrevious, Pause } from "@mui/icons-material";

export default function MusicPlayer(props) {
    const { song, setSong } = props;
    const { image_url, time, duration, title, artist, is_playing } = song || {};
    const [isPlaying, setIsPlaying] = useState(is_playing);
    const songProgress = (time / duration) * 100;

    const pauseSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/pause", requestOptions);
        setIsPlaying(false);
    };

    const playSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/play", requestOptions);
        setIsPlaying(true);
    };

    const skipSong = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/skip", requestOptions);
        setIsPlaying(true);
    };

    return (
        <Card container align="center">
            <Grid size={4} align="center">
                <img src={image_url} height="100%" width="100%" alt="" />
            </Grid>
            <Grid size={8} align="center">
                <Typography component="h5" variant="h5">
                    {title}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                    {artist}
                </Typography>
                <IconButton onClick={isPlaying ? () => pauseSong() : () => playSong()}>
                    {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                <IconButton onClick={() => skipSong()}>
                    <SkipNext />
                </IconButton>
            </Grid>
            <Grid item align="center">
                <Typography>{song.title}</Typography>
                <Typography color="textSecondary">{song.artist}</Typography>
                <LinearProgress variant="determinate" value={songProgress} />
            </Grid>
        </Card>
    );
}
