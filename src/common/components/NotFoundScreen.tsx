import { Grid, Typography } from "@mui/material"

export const NotFoundScreen = () => {
  return (
      <Grid container sx={{ justifyContent: 'center', marginTop: 20 }}>
          <Typography variant='h2' >
            Page Not Found
          </Typography>
      </Grid>
  )
}
