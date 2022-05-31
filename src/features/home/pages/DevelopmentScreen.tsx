import { Container, Typography, Grid, Paper } from '@mui/material';

export const DevelopmentScreen = () => {
  return (
    <Container maxWidth='xl'>
      <Grid display='flex' justifyContent='center'>
        <Grid>
          <Typography color='primary' variant='subtitle1' textAlign='center'>
            Development
          </Typography>
          <Typography color='white' variant='h4' sx={{ letterSpacing: -0.2 }}>
            HOW PIGGY BANK CRYPTO IS BUILT
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 5 }}
      >
        <Paper sx={{ padding: 2, backgroundColor: 'primary.main' }}>
          <Typography variant='subtitle1' fontWeight='bold' color='white'>
            This App was created with tecnologies above
          </Typography>
          <Grid container alignItems='center' sx={{ mt: 1, color: 'white' }}>
            <img
              src='../../assets/react.png'
              alt='react'
              width={24}
              height={24}
              style={{ marginRight: 5 }}
            />
            React
          </Grid>
          <Grid container alignItems='center' sx={{ mt: 1, color: 'white' }}>
            <img
              src='../../assets/typescript.png'
              alt='typescript'
              width={24}
              height={24}
              style={{ marginRight: 5 }}
            />
            Typescript
          </Grid>
          <Grid container alignItems='center' sx={{ mt: 1, color: 'white' }}>
            <img
              src='../../assets/redux.png'
              alt='redux'
              width={24}
              height={24}
              style={{ marginRight: 5 }}
            />
            Redux
          </Grid>
          <Grid container alignItems='center' sx={{ mt: 1, color: 'white' }}>
            <img
              src='../../assets/mui.png'
              alt='mui'
              width={24}
              height={24}
              style={{ marginRight: 5 }}
            />
            Material UI
          </Grid>
          <Grid container alignItems='center' sx={{ mt: 1, color: 'white' }}>
            <img
              src='../../assets/threejs.png'
              alt='mui'
              width={24}
              height={24}
              style={{ marginRight: 5 }}
            />
            Three.js
          </Grid>
          <Grid container alignItems='center' sx={{ mt: 1, color: 'white' }}>
            <img
              src='../../assets/react-testing-library.png'
              alt='react-testing-library'
              width={24}
              height={24}
              style={{ marginRight: 5 }}
            />
            React Testing Library
          </Grid>
          <Typography
            variant='subtitle1'
            fontWeight='bold'
            color='white'
            sx={{ mt: 1 }}
          >
            Smart Contract technology
          </Typography>
          <Grid container alignItems='center' sx={{ mt: 1, color: 'white' }}>
            <img
              src='../../assets/solidity.png'
              alt='solidity'
              width={24}
              height={24}
              style={{ marginRight: 5 }}
            />
            Solidity
          </Grid>
          <Grid container alignItems='center' sx={{ mt: 1, color: 'white' }}>
            <img
              src='../../assets/truffle.png'
              alt='truffle'
              width={24}
              height={24}
              style={{ marginRight: 5 }}
            />
            Truffle
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};
