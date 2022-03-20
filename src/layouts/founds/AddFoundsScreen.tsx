import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Button, Container, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import SavingsIcon from '@mui/icons-material/Savings';
import { IRootState } from '../../redux/store/store';
import { ConnectWallet } from '../../common/components/ConnectWallet';

export const AddFoundsScreen = () => {

  const { currentAccount } = useSelector((state: IRootState) => state.wallet);

  const [errors, setErrors] = useState<{ amount: string }>({ amount: '' });

  const [form, setForm] = useState({
    amount: ''
  });

  const { amount } = form;

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

  const handleClickAdd = () => {
    if (!amount) {
      setErrors({ ...errors, amount: 'Required field' });
    }

    if (amount !== '') {
      console.log('add');
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
          Adding founds to my Crypto Piggy Bank
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
                You have 0.8 ETH in your Piggy Bank
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="amount"
                label="Amount to Add"
                name="amount"
                error={Boolean(errors?.amount)}
                helperText={errors?.amount}
                value={amount}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {
            (currentAccount)
            ? (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClickAdd}
                >
                  ADD
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
