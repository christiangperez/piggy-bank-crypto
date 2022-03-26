import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Button, Container, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SavingsIcon from '@mui/icons-material/Savings';

import { IRootState } from '../../redux/store/store';
import { ConnectWallet } from '../../common/components/ConnectWallet';
import { startMakeDeposit } from '../../redux/actions/walletActions';

export const CreatePiggyScreen = () => {

  const dispatch = useDispatch();
  const { account } = useSelector((state: IRootState) => state.wallet);
  
  const [errors, setErrors] = useState<{ amount: string, expireDays: string }>({ amount: '', expireDays: ''});

  const [form, setForm] = useState({
    amount: '',
    expireDays: ''
  });

  const { amount, expireDays } = form;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
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
            Creating my Crypto Piggy Bank
          </Typography>
          <Box 
            component="form" 
            noValidate 
            onSubmit={handleSubmit} 
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="amount"
                  label="Amount"
                  name="amount"
                  type="number"
                  error={Boolean(errors?.amount)}
                  helperText={errors?.amount}
                  value={amount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="expireDays"
                  label="Days to Expires"
                  type="number"
                  id="expireDays"
                  error={Boolean(errors?.expireDays)}
                  helperText={errors?.expireDays}
                  value={expireDays}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            {
              (account)
              ? (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleClickCreate}
                  >
                    CREATE
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
