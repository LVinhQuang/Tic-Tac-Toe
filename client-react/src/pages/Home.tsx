import { Button, Grid } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Mainboard } from "../components/Mainboard";
import useUserStore from "../stores/UserStore";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';

interface Room {
    roomId: string;
    roomName: string;
    players: Array<{fullname: string, email: string, score: number}>;
  }
export default function Home() {
    const Navigate = useNavigate();
    const [rooms, setRooms] = useState<Array<Room>>([]);
    const {user, setUserDetails} = useUserStore() as {user: {fullname: string, email: string, score: number}, setUserDetails: Function};
    useEffect(() => {
        socket.emit('currentRooms');
        socket.on('currentRooms', (data: { rooms: Array<Room> }) => {
            setRooms(data.rooms);
        })
        return () => {
            socket.off('currentRooms');
        }
    }, [])
    const joinRoom = (roomId: string) => {
        if (roomId == null) {
            roomId = uuidv4();
        }
        socket.emit('joinRoom', { roomId: roomId, userData: user });
        setUserDetails({isInRoom: roomId});
        Navigate('/room/'+roomId);
    }
    return (
        <>
            <Grid item xs={4} height='calc(100% - 64px)'>
                <Sidebar/>
            </Grid>
            <Grid item xs={8}>
                <Mainboard rooms={rooms} joinRoom={joinRoom}/>
            </Grid>
        </>
    )
}