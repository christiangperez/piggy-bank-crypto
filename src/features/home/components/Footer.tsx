import { useNavigate } from 'react-router';
import {
  Grid,
  Typography,
  Container,
  IconButton,
  Link,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

export const Footer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmOrLess = useMediaQuery(theme.breakpoints.down('md'));
  const isMdOrLess = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Container maxWidth='xl' sx={{ background: 'black', paddingTop: 10 }}>
      <Grid container sx={{ marginBottom: { xs: 4, md: 0 } }}>
        {/* Gaming Kardz */}
        <Grid item xs={12} md={3}>
          <Grid item display='flex' alignItems='center' justifyContent='center'>
            <SavingsIcon sx={{ color: 'white', marginRight: 1 }} />
            <Typography
              color='white'
              variant={isSmOrLess ? 'h6' : isMdOrLess ? 'h6' : 'h5'}
              sx={{ fontWeight: 'bold', fontSize: 24, letterSpacing: -0.2 }}
              style={{ letterSpacing: 2 }}
            >
              PIGGY BANK CRYPTO
            </Typography>
          </Grid>
          <Grid
            item
            display='flex'
            justifyContent='center'
            sx={{ mt: { xs: 0, md: 2 } }}
          >
            <IconButton sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
              <Link
                href='https://www.linkedin.com/in/christian-g-perez/'
                variant='body2'
              >
                <LinkedinIcon sx={{ color: 'darkgray', fontSize: 24 }} />
              </Link>
            </IconButton>
            <IconButton sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
              <Link
                href='https://www.instagram.com/piggybankcrypto/'
                variant='body2'
              >
                <InstagramIcon sx={{ color: 'darkgray', fontSize: 24 }} />
              </Link>
            </IconButton>
            <IconButton sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
              <Link
                href='https://www.twitter.com/piggybankcrypto/'
                variant='body2'
              >
                <TwitterIcon sx={{ color: 'darkgray', fontSize: 24 }} />
              </Link>
            </IconButton>
          </Grid>
        </Grid>

        {/* Information */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{ marginLeft: 'auto', marginBottom: { xs: 5, md: 0 } }}
        >
          <Typography
            color='white'
            textAlign={isSmOrLess ? 'center' : 'unset'}
            sx={{ marginBottom: { xs: 1, md: 3 } }}
          >
            Information
          </Typography>
          <Link
            href='#'
            underline='hover'
            onClick={() => navigate('/development')}
            color='darkgray'
          >
            <Typography textAlign={isSmOrLess ? 'center' : 'unset'}>
              Development
            </Typography>
          </Link>
        </Grid>

        {/* Contact */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{ marginRight: 'auto', marginBottom: { xs: 5, md: 0 } }}
        >
          <Typography
            color='white'
            sx={{ marginBottom: { xs: 1, md: 3 } }}
            textAlign={isSmOrLess ? 'center' : 'unset'}
          >
            Contact
          </Typography>

          <Link
            color='white'
            underline='none'
            href='mailto:christiangperez@gmail.com'
            variant='body2'
          >
            <Grid display='flex'>
              <EmailIcon
                sx={{ color: 'white', fontSize: 24, marginRight: 1 }}
              />
              <Typography variant='subtitle1'>
                christiangperez@gmail.com
              </Typography>
            </Grid>
          </Link>
        </Grid>
      </Grid>

      {/* Rights Reserved */}
      <Grid
        item
        sx={{
          background: 'black',
          paddingBottom: 5,
          paddingTop: { xs: 1, md: 5 },
        }}
        xs={12}
      >
        <hr />
        <Typography color='white' textAlign='center' sx={{ paddingTop: 2 }}>
          © Piggy Bank Crypto 2022. All Rights Reserved.
        </Typography>
      </Grid>
    </Container>
  );
};
