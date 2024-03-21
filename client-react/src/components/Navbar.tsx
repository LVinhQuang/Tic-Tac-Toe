import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/UserStore';

export default function ButtonAppBar() {
  const Navigate = useNavigate();
  const { isLoggedIn, user } = useUserStore() as { isLoggedIn: boolean, user: object };
  const handleLogin = () => {
    Navigate('/login');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {
            isLoggedIn === false ?
              <Button color="inherit"
                onClick={handleLogin}
              >Login</Button> :
              <Button color="inherit"
                onClick={() => Navigate('/logout')}>Logout</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}