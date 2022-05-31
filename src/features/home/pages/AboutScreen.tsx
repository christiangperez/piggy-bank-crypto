import {
  Container,
  Typography,
  IconButton,
  Link,
  Grid,
  Stack,
} from '@mui/material';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export const AboutScreen = () => {
  return (
    <>
      <Container maxWidth='xl' sx={{ paddingTop: 2 }}>
        <Grid display='flex' justifyContent='center'>
          <Grid>
            <Typography color='primary' variant='subtitle1' textAlign='center'>
              About
            </Typography>
            <Typography color='white' variant='h2' sx={{ letterSpacing: -0.2 }}>
              PIGGY BANK CRYPTO
            </Typography>
          </Grid>
        </Grid>
        <Container>
          <Stack spacing={2} sx={{ marginTop: 5 }}>
            <Typography variant='subtitle1' sx={{ mt: 2, mb: 2 }} color='white'>
              Welcome to Piggy Bank Crypto. Here you can save your ETH directly
              in Ethereum's Blockchain. Your founds will be in a Smart Contract,
              these contracts are immutables and there is no posibility to
              modify anyone.
            </Typography>
            <Typography variant='subtitle1' sx={{ mt: 2, mb: 2 }} color='white'>
              Your deposit will be secure thanks to the Ethereum's Blockchain
              Tecnology. This is a new way to saving money like a traditional
              physical piggy bank, taking advantage of the blockchain.
            </Typography>
            <Grid sx={{ paddingBottom: 5 }}>
              <Typography color='white' variant='subtitle1'>
                Platform develped in new technologies with best programming
                practices.
              </Typography>
              <Typography color='white' variant='subtitle1'>
                Christian Perez is the owner and creator. He is a software
                engineering passionate about crypto.
              </Typography>
            </Grid>
          </Stack>
        </Container>
      </Container>

      <Grid container sx={{ pt: 2, pb: 2, background: '#5b68e1' }}>
        <Container>
          <Typography color='black' variant='h6'>
            If you are intersted to contact me, send me an email to:
            <IconButton disableRipple>
              <Link
                color='black'
                underline='none'
                href='mailto:christiangperez@gmail.com'
                variant='body2'
              >
                <Grid display='flex'>
                  <EmailIcon
                    sx={{ color: 'black', fontSize: 24, marginRight: 1 }}
                  />
                  <Typography variant='subtitle1'>
                    christiangperez@gmail.com
                  </Typography>
                </Grid>
              </Link>
            </IconButton>
          </Typography>
        </Container>
        <Container>
          <Typography color='black' variant='h6'>
            Or visit my Linkedin:
            <IconButton disableRipple>
              <Link
                color='black'
                underline='none'
                href='https://www.linkedin.com/in/christian-g-perez/'
                variant='body2'
              >
                <Grid display='flex'>
                  <LinkedinIcon
                    sx={{ color: 'black', fontSize: 24, marginRight: 1 }}
                  />
                  <Typography variant='subtitle1'>Linkedin</Typography>
                </Grid>
              </Link>
            </IconButton>
          </Typography>
        </Container>
      </Grid>
    </>
  );
};
