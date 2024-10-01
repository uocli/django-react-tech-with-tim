import React from "react";
import { Grid2 as Grid, Typography, IconButton, Slider, Card } from "@mui/material";
import { PlayArrow, SkipNext, SkipPrevious, Pause } from "@mui/icons-material";

export default function MusicPlayer(props) {
    const { song, isPlaying, setSong, setIsPlaying } = props;

    const skipSong = (forward = true) => {
        let currentIndex = props.queue.findIndex((songInQueue) => songInQueue.id === song.id);
        let newIndex = currentIndex + (forward ? 1 : -1);
        if (newIndex < 0) {
            newIndex = props.queue.length - 1;
        } else if (newIndex >= props.queue.length) {
            newIndex = 0;
        }
        setSong(props.queue[newIndex]);
    };

    return (
        <Card container align="center">
            <Grid size={4} align="center">
                <img src={song.image_url} height="100%" width="100%" alt="" />
            </Grid>
            <Grid size={8} align="center">
                <Typography component="h5" variant="h5">
                    {song.title}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                    {song.artist}
                </Typography>
                <IconButton onClick={() => skipSong(false)}>
                    <SkipPrevious />
                </IconButton>
                <IconButton onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                <IconButton onClick={() => skipSong()}>
                    <SkipNext />
                </IconButton>
            </Grid>
            <Grid item align="center">
                <Typography>{song.title}</Typography>
                <Typography color="textSecondary">{song.artist}</Typography>
                <audio controls style={{ width: "100%" }}>
                    <source src={song.audio_url} />
                </audio>
            </Grid>
        </Card>
    );
}
