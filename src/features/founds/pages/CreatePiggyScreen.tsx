import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import SavingsIcon from '@mui/icons-material/Savings';

import { IRootState } from '../../../redux/store/store';
import { ConnectWallet } from '../../../common/components/ConnectWallet';
import { startMakeDeposit } from '../../../redux/actions/walletActions';
import { useNavigate } from 'react-router';

export const CreatePiggyScreen = () => {
  const dispatch = useDispatch();
  const { account, hasDeposit } = useSelector(
    (state: IRootState) => state.wallet
  );

  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ amount: string; expireDays: string }>({
    amount: '',
    expireDays: '',
  });

  const [form, setForm] = useState({
    amount: '',
    expireDays: '',
  });

  const { amount, expireDays } = form;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleClickCreate = () => {
    if (!expireDays) {
      setErrors({ ...errors, expireDays: 'Required field' });
    }

    if (!amount) {
      setErrors({ ...errors, amount: 'Required field' });
    }

    if (amount !== '' && expireDays !== '') {
      dispatch(startMakeDeposit(amount, expireDays));
    }
  };

  const handleClickViewMyDeposit = () => {
    navigate('/view');
  };

  return (
    <Container maxWidth='xl'>
      <Box
        component='div'
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
        {!hasDeposit ? (
          <>
            <Typography variant='h4' sx={{ textAlign: 'center' }} color='white'>
              Creating my Crypto Piggy Bank
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='amount'
                    label='Amount'
                    name='amount'
                    type='number'
                    error={Boolean(errors?.amount)}
                    helperText={errors?.amount}
                    value={amount}
                    onChange={handleChange}
                    sx={{
                      input: { color: 'white' },
                      '& .MuiInputLabel-root': { color: '#dbdbdb' },
                      '& .MuiOutlinedInput-root': {
                        '& > fieldset': { borderColor: '#dbdbdb' },
                      },
                      '& .MuiOutlinedInput-root.Mui-focused': {
                        '& > fieldset': {
                          borderColor: 'primary',
                        },
                      },
                      '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                          borderColor: 'primary.light',
                        },
                      },
                    }}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='expireDays'
                    label='Days to Expires'
                    type='number'
                    id='expireDays'
                    error={Boolean(errors?.expireDays)}
                    helperText={errors?.expireDays}
                    value={expireDays}
                    onChange={handleChange}
                    InputLabelProps={{
                      style: { color: '#dbdbdb' },
                    }}
                    sx={{
                      input: { color: 'white' },
                      '& .MuiInputLabel-root': { color: '#dbdbdb' },
                      '& .MuiOutlinedInput-root': {
                        '& > fieldset': { borderColor: '#dbdbdb' },
                      },
                      '& .MuiOutlinedInput-root.Mui-focused': {
                        '& > fieldset': {
                          borderColor: 'primary',
                        },
                      },
                      '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                          borderColor: 'primary.light',
                        },
                      },
                    }}
                    variant='outlined'
                  />
                </Grid>
              </Grid>
              {account ? (
                <Button
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClickCreate}
                >
                  CREATE
                </Button>
              ) : (
                <ConnectWallet sx={{ mt: 3, mb: 2 }} fullWidth />
              )}
            </Box>
          </>
        ) : (
          <>
            <Container maxWidth='xl'>
              <Typography
                variant='h4'
                sx={{ textAlign: 'center' }}
                color='white '
              >
                You have already a Crypto Piggy Bank
              </Typography>
              <Grid display='flex' justifyContent='center' sx={{ mt: 2 }}>
                <Button
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClickViewMyDeposit}
                >
                  VIEW MY DEPOSIT
                </Button>
              </Grid>
            </Container>
          </>
        )}
      </Box>
    </Container>
  );
};
