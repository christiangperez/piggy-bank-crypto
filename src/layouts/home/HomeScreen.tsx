import { Grid, Typography, Button } from "@mui/material"
import SavingsIcon from '@mui/icons-material/Savings';

export const HomeScreen = () => {
  return (
    <>
      <Grid container sx={{ backgroundColor: 'primary.main' }}>
        <Grid item xs={12} md={6}>
          <Typography variant='h3' sx={{ color: 'white' }}>
            Save your founds in a Crypto Piggy Bank
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <SavingsIcon color='warning' sx={{ fontSize: 200 }} />
        </Grid>
        <Grid item xs md>
          <Button variant='contained' size='large' color='success'>
            CREATE
          </Button>
        </Grid>
      </Grid>

      <Grid container sx={{ backgroundColor: 'primary.main' }}>
        <Grid item xs={12} md={12}>
          <Typography variant='h5' sx={{ color: 'white'}}>
            Benefits of saveing in a Crypto Piggy Bank
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant='h6' sx={{ color: 'white'}}>
            A way to force you to save
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant='h6' sx={{ color: 'white'}}>
            Protect your founds to anything
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant='h6' sx={{ color: 'white'}}>
            Hide our founds for security
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ backgroundColor: 'primary.main' }}>
        <Typography sx={{ color: 'white'}}>
          Crypto Piggy Bank 2021-2022
        </Typography>
      </Grid>
    </>
  )
}
