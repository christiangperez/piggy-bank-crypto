import { useEffect, useState } from 'react';
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

import { IRootState } from '../../redux/store/store';
import { ConnectWallet } from '../../common/components/ConnectWallet';
import {
  startAddDeposit,
  startViewMyDeposit,
} from '../../redux/actions/walletActions';

export const AddFoundsScreen = () => {
  const dispatch = useDispatch();
  const { account, activeDeposit, depositAdded } = useSelector(
    (state: IRootState) => state.wallet
  );

  const [errors, setErrors] = useState<{ amount: string }>({ amount: '' });
  const [showDepositAdded, setShowDepositAdded] = useState(false);

  const [form, setForm] = useState({
    amount: '',
  });

  const { amount } = form;

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

  const handleClickAdd = () => {
    if (!amount) {
      setErrors({ ...errors, amount: 'Required field' });
    }

    if (amount !== '') {
      dispatch(startAddDeposit(amount));
    }
  };

  useEffect(() => {
    dispatch(startViewMyDeposit());
  }, [dispatch]);

  useEffect(() => {
    if (depositAdded) {
      setShowDepositAdded(true);
    }
  }, [depositAdded]);

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
              Adding founds to my Crypto Piggy Bank
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              {showDepositAdded ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>
                      Your ETH deposit has been added into your Crypto Piggy
                      Bank
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>
                      You have {activeDeposit?.amount} ETH in your Piggy Bank
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='amount'
                      label='Amount to Add'
                      name='amount'
                      error={Boolean(errors?.amount)}
                      helperText={errors?.amount}
                      value={amount}
                      onChange={handleChange}
                    />
                  </Grid>
                  {account ? (
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleClickAdd}
                    >
                      ADD
                    </Button>
                  ) : (
                    <ConnectWallet sx={{ mt: 3, mb: 2 }} fullWidth />
                  )}
                </Grid>
              )}
            </Box>
          </>
        ) : (
          <Typography variant='h4'>
            You don't have a Crypto Piggy Bank CREATED
          </Typography>
        )}
      </Box>
    </Container>
  );
};
