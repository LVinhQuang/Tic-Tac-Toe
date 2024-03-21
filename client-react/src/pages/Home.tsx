import { Button, Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Mainboard } from "../components/Mainboard";

export default function Home() {
    return (
        <>
            <Grid item xs={4} height='calc(100% - 64px)'>
                <Sidebar />
            </Grid>
            <Grid item xs={8}>
                <Mainboard />
            </Grid>
        </>
    )
}