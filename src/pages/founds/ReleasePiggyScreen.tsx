import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Button, Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SavingsIcon from '@mui/icons-material/Savings';

import { IRootState } from '../../redux/store/store';
import { ConnectWallet } from '../../common/components/ConnectWallet';
import {
  startViewMyDeposit,
  startReleaseDeposit,
} from '../../redux/actions/walletActions';

export const ReleasePiggyScreen = () => {
  const dispatch = useDispatch();
  const { account, activeDeposit } = useSelector(
    (state: IRootState) => state.wallet
  );

  const handleClickRelease = () => {
    dispatch(startReleaseDeposit());
  };

  useEffect(() => {
    dispatch(startViewMyDeposit());
  }, []);

  return (
    <Container component='main' maxWidth='xs'>
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
        {activeDeposit ? (
          <>
            <Typography variant='h4' sx={{ textAlign: 'center' }}>
              You have a Crypto Piggy Bank CREATED
            </Typography>
          </>
        ) : (
          <Typography variant='h4'>
            You don't have a Crypto Piggy Bank CREATED
          </Typography>
        )}
        <Box component='form' noValidate sx={{ mt: 3 }}>
          {activeDeposit && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h6'>
                  Creation date: {activeDeposit?.expireDate}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>
                  Amount: {activeDeposit?.amount} ETH
                </Typography>
              </Grid>
            </Grid>
          )}
          {account ? (
            activeDeposit?.releaseAvaible ? (
              <Button
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClickRelease}
              >
                RELEASE FOUNDS
              </Button>
            ) : (
              activeDeposit && (
                <Typography variant='h6'>
                  Your deposit will be release in 3 days
                </Typography>
              )
            )
          ) : (
            <ConnectWallet sx={{ mt: 3, mb: 2 }} fullWidth />
          )}
        </Box>
      </Box>
    </Container>
  );
};
