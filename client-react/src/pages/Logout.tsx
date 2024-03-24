import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_SERVER } from "../backendkey";
import useUserStore from "../stores/UserStore";
import { socket } from "../socket";

export default function Logout() {
    const navigate = useNavigate();
    const { setUserDetails } = useUserStore() as {setUserDetails: Function };
    useEffect(() => {
        axios.post(BACKEND_SERVER + `/auth/logout`, {}, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    setUserDetails({ isLoggedIn: false, user: {fullname: "", email: "", score: null }, isInRoom: false});
                    socket.disconnect();
                    navigate('/login');
                }
            })
    }, [])
    return (
        <div>
            Logging out...
        </div>
    )
}