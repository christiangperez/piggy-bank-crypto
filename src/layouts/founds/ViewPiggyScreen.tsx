import { useSelector } from 'react-redux';
import { Avatar, Button, Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import SavingsIcon from '@mui/icons-material/Savings';
import { IRootState } from '../../redux/store/store';
import { ConnectWallet } from '../../common/components/ConnectWallet';

export const ViewPiggyScreen = () => {

  const { currentAccount } = useSelector((state: IRootState) => state.wallet);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleClickRelease = () => {
    console.log('release');
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SavingsIcon />
          </Avatar>
          <Typography variant="h4">
            You have a Crypto Piggy Bank CREATED
          </Typography>
          <Box 
            component="form" 
            noValidate 
            onSubmit={handleSubmit} 
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Creation date: 09/03/22
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Amount: 0.8 ETH
                </Typography>
              </Grid>
            </Grid>
            {
              (currentAccount)
              ? (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleClickRelease}
                  >
                    RELEASE FOUNDS
                  </Button>
              )
              : (
                <ConnectWallet sx={{ mt: 3, mb: 2 }} fullWidth />
              )
            }
          </Box>
        </Box>

    </Container>
  )
}
