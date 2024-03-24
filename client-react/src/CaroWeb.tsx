import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Logout from './pages/Logout'
import { Grid } from '@mui/material'
import { Sidebar } from './components/Sidebar'
import { socket } from './socket'
import Room from './pages/Room'

export const CaroWeb = () => {
  socket.connect();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("Connected",socket.id)
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return (
    <>
      <Grid container height='100vh'>
        <Grid item xs={12} height='64px'>
          <Navbar />
        </Grid>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/room/:roomId' element={<Room />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Grid>
    </>
  )
}
