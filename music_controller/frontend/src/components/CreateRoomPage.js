import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function CreateRoomPage(props) {
    const defaultVotes = 2;
    const navigate = useNavigate();
    const [guestCanPause, setGuestCanPause] = React.useState(false);
    const [votesToSkip, setVotesToSkip] = React.useState(defaultVotes);

    const handleVotesChange = (event) => {
        setVotesToSkip(+event.target.value || 1);
    };

    const handleGuestCanPauseChange = (event) => {
        setGuestCanPause(event.target.value === "true");
    };

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => navigate("/room/" + data.code))
            .catch((error) => console.log(error));
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Create A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">Guest Control of Playback State</div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        required={true}
                        type="number"
                        defaultValue={defaultVotes}
                        onChange={handleVotesChange}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                    />
                    <FormHelperText>
                        <div align="center">Votes Required to Skip Song</div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
                    Create A Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}
