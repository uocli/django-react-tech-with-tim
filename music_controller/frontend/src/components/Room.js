import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Room() {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const navigate = useNavigate();
    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode)
            .then((response) => {
                if (!response.ok) {
                    // this.props.leaveRoomCallback();
                    navigate("/");
                }
                return response.json();
            })
            .then(({ success, message, votes_to_skip, guest_can_pause, is_host }) => {
                setVotesToSkip(votes_to_skip);
                setGuestCanPause(guest_can_pause);
                setIsHost(is_host);
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
