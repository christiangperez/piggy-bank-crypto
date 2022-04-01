import { Container, Typography, IconButton, Link, Grid, Paper } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';

export const AboutScreen = () => {
	return (
		<>
			<Grid container justifyContent="space-between" sx={{ mt: 5 }}>
				<Grid item xs={12} md={6} sx={{ paddingLeft: 2, paddingRight: 2 }}>
					<Grid container display="flex" alignItems="center" direction="row">
						<SavingsIcon />
						<Typography variant="h6" sx={{ marginLeft: 1 }}>
							Crypto Piggy Bank
						</Typography>
					</Grid>
					<Typography variant="subtitle1" sx={{ mt: 1 }}>
						Developed by Christian Perez
					</Typography>
					<Typography variant="subtitle1" sx={{ mt: 2 }}>
						In Crypto Piggy Bank you can save your ETH directly in Ethereum's Blockchain. Your founds will be in a Smart
						Contract, these contracts are immutables and there is no posibility to modify anyone. Your deposit will be
						secure thanks to the Ethereum's Blockchain Tecnology. This is a new way to saving money like a traditional
						physical piggy bank, taking advantage of the blockchain.
					</Typography>
					<Typography variant="subtitle1" sx={{ mt: 2 }}>
						If you want to contact me, send me an email to: christiangperez@gmail.com
					</Typography>
					<IconButton disableRipple sx={{ mt: 2, mb: 2 }}>
						<Link href="https://www.linkedin.com/in/christian-g-perez/" variant="body2">
							<Grid container alignItems="center">
								<img src="/assets/linkedin.png" alt="linkedin" width={24} height={24} style={{ marginRight: 5 }} />
								Linkedin
							</Grid>
						</Link>
					</IconButton>
				</Grid>

				<Grid item xs={12} md={4} sx={{ paddingLeft: 2, paddingRight: 2 }}>
					<Paper sx={{ padding: 2, backgroundColor: 'primary.light' }}>
						<Typography variant="subtitle1" fontWeight="bold" color="white">
							This App was created with tecnologies above
						</Typography>
						<Grid container alignItems="center" sx={{ mt: 1, color: 'white' }}>
							<img src="../../assets/react.png" alt="react" width={24} height={24} style={{ marginRight: 5 }} />
							React
						</Grid>
						<Grid container alignItems="center" sx={{ mt: 1, color: 'white' }}>
							<img
								src="../../assets/typescript.png"
								alt="typescript"
								width={24}
								height={24}
								style={{ marginRight: 5 }}
							/>
							Typescript
						</Grid>
						<Grid container alignItems="center" sx={{ mt: 1, color: 'white' }}>
							<img src="../../assets/redux.png" alt="redux" width={24} height={24} style={{ marginRight: 5 }} />
							Redux
						</Grid>
						<Grid container alignItems="center" sx={{ mt: 1, color: 'white' }}>
							<img src="../../assets/mui.png" alt="mui" width={24} height={24} style={{ marginRight: 5 }} />
							Material UI
						</Grid>
						<Grid container alignItems="center" sx={{ mt: 1, color: 'white' }}>
							<img
								src="../../assets/react-testing-library.png"
								alt="react-testing-library"
								width={24}
								height={24}
								style={{ marginRight: 5 }}
							/>
							React Testing Library
						</Grid>
						<Typography variant="subtitle1" fontWeight="bold" color="white" sx={{ mt: 1 }}>
							Smart Contract technology
						</Typography>
						<Grid container alignItems="center" sx={{ mt: 1, color: 'white' }}>
							<img src="../../assets/solidity.png" alt="solidity" width={24} height={24} style={{ marginRight: 5 }} />
							Solidity
						</Grid>
						<Grid container alignItems="center" sx={{ mt: 1, color: 'white' }}>
							<img src="../../assets/truffle.png" alt="truffle" width={24} height={24} style={{ marginRight: 5 }} />
							Truffle
						</Grid>
					</Paper>
				</Grid>
			</Grid>

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
