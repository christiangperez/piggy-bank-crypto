import {
  Grid,
  Typography,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { PropsWithChildren, SVGProps } from 'react';

interface IProps {
  refCard: any;
  imageIcon: PropsWithChildren<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  description: string;
  color1: string;
  color2: string;
  subtitleColor: string;
  subtitleBackgroundColor1: string;
  subtitleBackgroundColor2: string;
  cardBackgroundColor1?: string | undefined;
  cardBackgroundColor2?: string | undefined;
  sx?: SxProps<Theme> | undefined;
}

export const BenefitCard = ({
  refCard,
  imageIcon,
  title,
  subtitle,
  description,
  color1,
  color2,
  subtitleColor,
  subtitleBackgroundColor1,
  subtitleBackgroundColor2,
  cardBackgroundColor1 = '#1c202b',
  cardBackgroundColor2 = '#303542',
  sx,
}: IProps) => {
  const theme = useTheme();
  const smOrDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack sx={sx} ref={refCard} className='fadeTop'>
      <Box
        component='div'
        width={400}
        borderRadius={2}
        style={{
          background: `linear-gradient(${color1}, ${color2})`,
        }}
      >
        <Box
          component='div'
          borderRadius={2}
          sx={{
            marginLeft: 0.2,
            marginRight: 0.2,
            marginTop: 0.2,
            marginBottom: 0.2,
            paddingTop: 2,
          }}
          style={{
            background: `linear-gradient(to right bottom, ${cardBackgroundColor1}, ${cardBackgroundColor2})`,
          }}
        >
          <Grid item display='flex' justifyContent='center' alignItems='center'>
            {imageIcon}
          </Grid>
          <Typography
            color='white'
            fontWeight='bold'
            align={smOrDown ? 'center' : 'inherit'}
            variant={smOrDown ? 'body1' : 'h6'}
            textAlign='center'
            sx={{
              marginTop: 2,
              textShadow: 'rgb(255 255 255 / 30%) 0px 0px 12px',
            }}
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            color='#a3abb8'
            fontWeight='400'
            fontSize={18}
            sx={{
              marginTop: 2,
              marginBottom: 4,
              marginLeft: 2,
              marginRight: 1,
            }}
          >
            {description}
          </Typography>
          <Box
            component='div'
            sx={{
              background: `${subtitleBackgroundColor1}`,
              paddingTop: 0.5,
              paddingBottom: 0.5,
            }}
            textAlign='center'
            style={{
              background: `radial-gradient(circle farthest-side, ${subtitleBackgroundColor1}, ${subtitleBackgroundColor2})`,
            }}
          >
            <Typography color={subtitleColor} fontWeight='500'>
              {subtitle}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};
