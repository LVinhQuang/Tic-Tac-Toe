import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bgImg from '../assets/tictactoe.jpg'
import { BACKEND_SERVER, GOOGLE_API } from '../backendkey'
import useUserStore from '../stores/UserStore'
import { ConstructionOutlined } from '@mui/icons-material';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const [authenticationFailed, setAuthenticationFailed] = React.useState(false);
    const { isInitialized, isLoggedIn,setUserDetails } = useUserStore() as { isInitialized: boolean, setUserDetails: Function,user:  object,isLoggedIn: boolean };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password')
        const backendUrl = BACKEND_SERVER + `/auth/login`
        axios.post(backendUrl, {
            email: email,
            password: password
        },{withCredentials: true})
            .then((response) => {
                if (response.status === 200) {
                    setUserDetails({ isLoggedIn: true, user: response.data.user, isInRoom: false});
                    navigate('/');
                }
            })
            .catch((error) => {
                if (error.response.status === 401)
                    setAuthenticationFailed(true);
            });
    }
    const loginWithGoogle = () => {
        window.open(GOOGLE_API, "_self");
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgImg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: 'none'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            {authenticationFailed && <Typography color="error">Invalid email or password</Typography>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ backgroundColor: 'blue' }}
                            >
                                Sign In
                            </Button>
                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        style={{ backgroundColor: 'red' }}
                                        onClick={loginWithGoogle}
                                    >
                                        Sign In with Google
                                    </Button>
                                </Grid >
                                <Grid item xs={6}>
                                    <Link href="/signup" variant="body2">
                                        <span>
                                            Don't have an account? Sign Up
                                        </span>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}