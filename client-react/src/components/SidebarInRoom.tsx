import { Avatar, Box } from '@mui/material'
import React from 'react'

interface Room {
    roomId: string;
    roomName: string;
    players: Array<{ fullname: string, email: string, score: number, isReady: boolean }>;
}

export default function SidebarInRoom({ room }: { room: Room }) {
    const { players } = room;
    console.log(room);
    return (
        <Box display='flex' flexDirection='column' alignItems='center' m={2} p={2} sx={{ border: '2px solid gray', height: '85%' }}>
            <Box sx={{ height: '50%', border: '2px solid black', margin: '5px' }}>
                <Box display='flex' p={2} alignItems={'center'} justifyContent={'center'}>
                    <div>
                        <Avatar sx={{ width: '50%', height: '100%' }} src='https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg' />
                    </div>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'70%'} justifyContent={'center'}>
                        <span>
                            {players[0].fullname}
                        </span>
                        <span>
                            Điểm số: {players[0].score}
                        </span>
                    </Box>
                </Box>
                <Box display='flex' p={2} alignItems={'center'} justifyContent={'space-evenly'}>
                    <span>
                        X
                    </span>
                    <span>
                        {players[0].isReady ? 'Sẵn sàng' : 'Chưa sẵn sàng'}
                    </span>
                </Box>
            </Box>
            {players.length > 1 && (
                <Box sx={{ height: '50%', border: '2px solid black', margin: '5px' }}>
                    <Box display='flex' p={2} alignItems={'center'} justifyContent={'center'}>
                        <div>
                            <Avatar sx={{ width: '50%', height: '100%' }} src='https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg' />
                        </div>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'70%'} justifyContent={'center'}>
                            <span>
                                {players[1].fullname}
                            </span>
                            <span>
                                Điểm số: {players[1].score}
                            </span>
                        </Box>
                    </Box>
                    <Box display='flex' p={2} alignItems={'center'} justifyContent={'space-evenly'}>
                        <span>
                            O
                        </span>
                        <span>
                            {players[1].isReady ? 'Sẵn sàng' : 'Chưa sẵn sàng'}
                        </span>
                    </Box>
                </Box>
            )}
        </Box>
    )
}
