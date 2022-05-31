import { Grid } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import PiggyModel from '../../../AnimatedModels/PiggyModel';

export const PiggyAnimation = () => {
  return (
    <Grid
      item
      xs={12}
      md={5}
      sx={{
        height: 350,
        paddingRight: 10,
      }}
    >
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[-1, -4, -2]} intensity={0.6} />
          <directionalLight position={[1, 4, 2]} intensity={0.7} />
          <OrbitControls enableZoom={false} />
          <PiggyModel />
        </Suspense>
      </Canvas>
    </Grid>
  );
};
