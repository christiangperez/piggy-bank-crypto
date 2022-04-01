import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
	Grid,
	Typography,
	Button,
	useMediaQuery,
	useTheme,
	Container,
	Card,
	CardHeader,
	CardContent,
} from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';

const cards = [
	{
		title: 'SAVING',
		description: 'A WAY TO FORCE YOU TO SAVE',
	},
	{
		title: 'SECURITY',
		description: 'PROTECT YOUR FOUNDS TO ANYTHING',
	},
	{
		title: 'HIDDING',
		description: 'HIDE YOUR FOUNDS FOR SECURITY',
	},
];

export const HomeScreen = () => {
	const navigate = useNavigate();

	const theme = useTheme();
	const mdOrUp = useMediaQuery(theme.breakpoints.up('md'));
	const [height, setHeight] = useState(window.innerHeight);

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

	return (
		<>
			<Container disableGutters maxWidth="xl">
				{/* Main Page */}
				<Grid container sx={{ backgroundColor: 'primary.main', height: height - 50 }}>
					<Grid
						container
						sx={{
							backgroundColor: 'primary.main',
							paddingTop: {
								xs: 2,
								md: 6,
							},
						}}
						justifyContent="center"
					>
						<Grid item xs={9} md={4} display="flex" alignItems={mdOrUp ? 'center' : 'end'} justifyContent="center">
							<Typography
								variant={mdOrUp ? 'h2' : 'h3'}
								sx={{
									marginTop: 2,
									color: 'white',
									textAlign: 'center',
									fontWeight: 'bold',
								}}
							>
								Save your founds in a Crypto Piggy Bank
							</Typography>
						</Grid>
						<Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
							<SavingsIcon color="warning" sx={{ fontSize: 200 }} />
						</Grid>
					</Grid>

					{/* Create Piggy Button */}
					<Grid container>
						<Grid
							item
							xs={12}
							md
							display="flex"
							alignItems="start"
							justifyContent="center"
							sx={{
								pt: { xs: 1, md: 0 },
								pb: 1,
							}}
						>
							<Button
								variant="contained"
								size="large"
								color="success"
								sx={{ marginTop: 2 }}
								onClick={handleClickCreate}
							>
								CREATE MY PIGGY BANK
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Container>

			{/* CardsPage Title */}
			<Container disableGutters maxWidth="sm" sx={{ pt: 8, pb: 6 }}>
				<Typography component="h1" variant="h2" align="center" gutterBottom fontWeight="bold">
					Benefits of saving in a Crypto Piggy Bank
				</Typography>
			</Container>

			{/* Cards*/}
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{cards.map((card) => (
						<Grid item key={card.title} xs={12} sm={card.title === 'HIDDING' ? 12 : 6} md={4}>
							<Card>
								<CardHeader
									title={card.title}
									titleTypographyProps={{ align: 'center' }}
									subheaderTypographyProps={{
										align: 'center',
									}}
									sx={{
										color: 'white',
										backgroundColor: (theme) =>
											theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.grey[700],
									}}
								/>
								<CardContent sx={{ backgroundColor: 'primary.dark' }}>
									<Grid
										sx={{
											minHeight: mdOrUp ? '200px' : '120px',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Typography variant="subtitle1" align="center" color="white">
											{card.description}
										</Typography>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>

			{/* Footer */}
			<Container
				maxWidth="md"
				component="footer"
				sx={{
					borderTop: (theme) => `1px solid ${theme.palette.divider}`,
					mt: 8,
					py: [3, 6],
				}}
			>
				<Typography variant="body2" color="primary.main" align="center" sx={{ mt: 5 }}>
					Crypto Piggy Bank 2021-
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Container>
		</>
	);
};
