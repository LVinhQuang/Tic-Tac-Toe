import { Box, Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { socket } from '../socket'
import SidebarInRoom from '../components/SidebarInRoom';
import { Gameboard } from '../components/Gameboard';
import useUserStore from '../stores/UserStore';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Popup } from '../components/Popup';

interface Room {
  roomId: string;
  roomName: string;
  players: Array<{ fullname: string, email: string, score: number, isReady: boolean }>;
}

export default () => {
  const [room, setRoom] = React.useState<Room>({ roomId: '', roomName: '', players: []});
  const {user, setUserDetails} = useUserStore() as { user: { fullname: string, email: string, score: number }, setUserDetails: Function}
  const [playerIndex, setPlayerIndex] = React.useState<number>(0);
  const [startGame, setStartGame] = React.useState<boolean>(false);
  const [startPopUp, setStartPopUp] = React.useState<boolean>(false);
  let {roomId} = useParams();
  const Navigate = useNavigate();
  useEffect(() => {
    socket.emit('getRoomDetails', { roomId: roomId });
    socket.on('roomDetails', (data: { room: Room }) => {
      setRoom(data.room)
      if (data.room.players[0].email === user.email) {
        setPlayerIndex(1);
      }
      else if (data.room.players[1].email === user.email) {
        setPlayerIndex(2);
      }
    })
    socket.on('startGame', () => {
      setStartGame(true);
      setStartPopUp(true);
    })
    return () => {
      socket.off('roomDetails');
      socket.off('connect')
    }
  }, [])
  const changeReadyStatus = () => {
    socket.emit('changeReadyStatus', {roomId: roomId, userData: user });
  }
  const leaveRoom = () => {
    socket.emit('leaveRoom', {roomId: roomId, userData: user });
    setUserDetails({ isInRoom: '' })
    Navigate('/');
  }
  return (
    <>
      <Popup trigger={startPopUp} setTrigger={setStartPopUp} timeOut={1}>
        <h1>Game Start!</h1>
      </Popup>
      <Grid item xs={4} height='calc(100% - 64px)'>
        {room.roomId && <SidebarInRoom room={room} />}
      </Grid>
      <Grid item xs={8}>
      <Box display='flex' flexDirection='column' alignItems='center' m={2} p={2} sx={{ border: '2px solid gray', height: '85%' }}>
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' width='100%' height='15%'>
                <Button onClick={() => leaveRoom()} variant='contained' color='primary' sx={{ width: '30%', height: '50px', fontSize: '20px', fontWeight: 'bold', margin: '5px', backgroundColor: 'red' }}>leave Room</Button>
                {room.players.length == 2 && <Button onClick={() => changeReadyStatus()} variant='contained' color='primary' sx={{ width: '30%', height: '50px', fontSize: '20px', fontWeight: 'bold', margin: '5px' }}>{room.players[playerIndex-1].isReady ? 'Unready': 'Ready'}</Button>}
            </Box>
            {startGame && <Gameboard playerIndex={playerIndex}/>}
        </Box>
      </Grid>
    </>
  )
}
