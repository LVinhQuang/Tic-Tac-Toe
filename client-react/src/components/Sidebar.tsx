import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/UserStore';
import React, { useEffect } from 'react'
import { Avatar, Container, Grid } from '@mui/material';
import { socket } from '../socket';
interface Room {
    roomId: string;
    roomName: string;
    players: Array<{ fullname: string, email: string, score: number }>;
}
export const Sidebar = () => {
    const { user } = useUserStore() as { user: { fullname: string, email: string, score: number } };
    return (
        <Box display='flex' flexDirection='column' alignItems='center' m={2} p={2} sx={{ border: '2px solid gray', height: '85%' }}>
            <Box display='flex' flexDirection='column' alignItems='center' m={2} p={2} >
                <Avatar sx={{ width: 200, height: 200 }} src='https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg' />
                <span style={{ fontSize: '2em' }}>
                    {user.fullname}
                </span>
                <span style={{ fontSize: '2em' }}>
                    Điểm số: {user.score}
                </span>
            </Box>
        </Box>

    )
}
