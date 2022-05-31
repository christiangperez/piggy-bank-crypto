import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import './Home.css';

import {
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Stack,
} from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import SecurityIcon from '@mui/icons-material/Security';
import HideSourceIcon from '@mui/icons-material/HideSource';
import { BenefitCard } from '../components/BenefitCard';
import { Footer } from '../components/Footer';
import { PiggyAnimation } from '../components/PiggyAnimation';

export const HomeScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const mdOrUp = useMediaQuery(theme.breakpoints.up('md'));

  const [height, setHeight] = useState(window.innerHeight);
  const refTitleBenefits = useRef<HTMLHeadingElement>(null);
  const refSubtitleBenefits = useRef<HTMLHeadingElement>(null);
  const refCard1 = useRef<HTMLHeadingElement>(null);
  const refCard2 = useRef<HTMLHeadingElement>(null);
  const refCard3 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClickCreate = () => {
    navigate('/create');
  };

  // Scroll Effect Listener
  useEffect(() => {
    const scrollListener = () => {
      let screenSize = window.innerHeight;

      // Effect Cards
      if (refCard1.current) {
        if (refCard1.current.getBoundingClientRect().top < screenSize) {
          refCard1.current.classList.add('visible');
        } else {
          refCard1.current.classList.remove('visible');
        }
      }

      if (refCard2.current) {
        if (refCard2.current.getBoundingClientRect().top < screenSize) {
          refCard2.current.classList.add('visible');
        } else {
          refCard2.current.classList.remove('visible');
        }
      }

      if (refCard3.current) {
        if (refCard3.current.getBoundingClientRect().top < screenSize) {
          refCard3.current.classList.add('visible');
        } else {
          refCard3.current.classList.remove('visible');
        }
      }

      // Effect Benefits Title
      if (refTitleBenefits.current) {
        if (refTitleBenefits.current.getBoundingClientRect().top < screenSize) {
          refTitleBenefits.current.classList.add('visible');
        } else {
          refTitleBenefits.current.classList.remove('visible');
        }
      }

      // Effect Benefits Subtitle
      if (refSubtitleBenefits.current) {
        if (
          refSubtitleBenefits.current.getBoundingClientRect().top < screenSize
        ) {
          refSubtitleBenefits.current.classList.add('visible');
        } else {
          refSubtitleBenefits.current.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  const scrollToBenefits = () => {
    if (refTitleBenefits.current) {
      refTitleBenefits.current.scrollIntoView();
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          height: height - 50,
          paddingBottom: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: { md: 10 },
        }}
        style={{
          background: mdOrUp
            ? 'radial-gradient(circle 300px at 75% 50%, rgb(14, 13, 56), transparent)'
            : 'transparent',
        }}
      >
        {/* Main */}
        <Grid item xs={9} md={7}>
          <Typography
            variant={mdOrUp ? 'h2' : 'h3'}
            sx={{
              marginTop: 2,
              color: '#007aff',
              fontWeight: 'bold',
              fontSize: 72,
            }}
            style={{
              letterSpacing: '-0.1rem',
              background:
                'linear-gradient(88deg, rgb(115, 129, 237) 0%, rgb(103, 227, 255) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Save your founds in a Crypto Piggy Bank
          </Typography>
          <Typography
            sx={{
              marginTop: 3,
              color: '#a3abb8',
              fontSize: 22,
            }}
          >
            You can transfer your founds and keep it secure thanks to Blockchain
            tecnology.
          </Typography>

          {/* Buttons */}
          <Grid container>
            <Grid
              item
              display='flex'
              alignItems='start'
              sx={{
                pt: { xs: 1, md: 2 },
                pb: 1,
              }}
            >
              <Button
                variant='contained'
                size='large'
                sx={{ marginTop: 2, color: '#181e37' }}
                onClick={handleClickCreate}
              >
                CREATE MY PIGGY BANK
              </Button>
              <Button
                variant='outlined'
                size='large'
                sx={{ marginTop: 2, color: 'primary', marginLeft: 1 }}
                onClick={scrollToBenefits}
              >
                KNOW BENEFITS
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Piggy Animation */}
        <PiggyAnimation />
      </Grid>

      {/* Benefits Section */}
      <Stack sx={{ height }} direction='column' alignItems='center'>
        <Typography
          ref={refTitleBenefits}
          className='fadeLeft'
          component='h1'
          variant='h2'
          align='center'
          gutterBottom
          color='white'
          fontWeight='bold'
          sx={{
            letterSpacing: '-0.1rem',
            textShadow: 'rgb(255 255 255 / 30%) 0px 0px 12px',
          }}
        >
          Benefits
        </Typography>
        <Typography
          ref={refSubtitleBenefits}
          className='fadeRight'
          component='h1'
          align='center'
          gutterBottom
          color='#a3abb8'
          fontWeight='400'
          fontSize={20}
        >
          Take advantage of some benefits saving your founds in Piggy Bank
          Crypto
        </Typography>

        <Grid
          container
          display='flex'
          justifyContent='center'
          sx={{ paddingTop: 5 }}
        >
          {/* First Card */}
          <BenefitCard
            refCard={refCard1}
            imageIcon={<SavingsIcon sx={{ color: '#5b66e1', fontSize: 96 }} />}
            title='SAVING'
            subtitle='BENEFIT #1'
            description='A way to force you to save. You can deposit every time that you
            want. In small deposits or deposit all your founds.'
            color1='#5b66e1'
            color2='#2b315b'
            subtitleColor='primary'
            subtitleBackgroundColor1='#2f3557'
            subtitleBackgroundColor2='#272c48'
            sx={{ paddingTop: { xs: 0, md: 4 }, paddingBottom: 4 }}
          />

          {/* Second Card */}
          <BenefitCard
            refCard={refCard2}
            imageIcon={<SecurityIcon sx={{ color: '#5ab8c7', fontSize: 96 }} />}
            title='SECURITY'
            subtitle='BENEFIT #2'
            description='Protect your founds to anything. When you put assets in a
            Blockchain it can not modify because their cryptographic
            properties.'
            color1='#5ab8c7'
            color2='#263944'
            subtitleColor='#5ab8c7'
            subtitleBackgroundColor1='#2d4452'
            subtitleBackgroundColor2='#263944'
            sx={{
              paddingTop: { xs: 0, md: 4 },
              paddingBottom: 4,
              marginLeft: 5,
              marginRight: 5,
            }}
          />

          {/* Third Card */}
          <BenefitCard
            refCard={refCard3}
            imageIcon={
              <HideSourceIcon sx={{ color: '#5b66e1', fontSize: 96 }} />
            }
            title='HIDDING'
            subtitle='BENEFIT #3'
            description='Hide you founds for security. If you want to hide assets for
            some reason, you can deposit here for a while.'
            color1='#5b66e1'
            color2='#2b315b'
            subtitleColor='primary'
            subtitleBackgroundColor1='#2f3557'
            subtitleBackgroundColor2='#272c48'
            sx={{ paddingTop: { xs: 0, md: 4 }, paddingBottom: 4 }}
          />
        </Grid>
      </Stack>

      {/* Footer Section */}
      <Footer />
    </>
  );
};
