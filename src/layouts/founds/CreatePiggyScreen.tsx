import { Avatar, Button, Container, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SavingsIcon from '@mui/icons-material/Savings';

export const CreatePiggyScreen = () => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              CREATE
            </Button>
          </Box>
        </Box>

    </Container>
  )
}
