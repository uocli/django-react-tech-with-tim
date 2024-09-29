import React, { useState } from "react";
import { useParams } from "react-router-dom";

/*export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        this.roomCode = props.match.params.roomCode;
        this.getRoomDetails();
    }

    getRoomDetails() {
        fetch("/api/get-room" + "?code=" + this.roomCode)
            .then((response) => {
                if (!response.ok) {
                    // this.props.leaveRoomCallback();
                    this.props.history.push("/");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            });
    }

    render() {
        return (
            <div>
                <h1>{this.roomCode}</h1>
                <p>Votes To Skip: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
            </div>
        );
    }
}*/

export default function Room() {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode)
            .then((response) => {
                if (!response.ok) {
                    // this.props.leaveRoomCallback();
                    this.props.history.push("/");
                }
                return response.json();
            })
            .then((data) => {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
            });
    };

    getRoomDetails();

    return (
        <div>
            <h1>{roomCode}</h1>
            <p>Votes To Skip: {votesToSkip}</p>
            <p>Guest Can Pause: {guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
}
