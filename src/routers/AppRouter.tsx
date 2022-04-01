import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { NotFoundScreen } from '../common/components/NotFoundScreen';
import { AddFoundsScreen } from '../pages/founds/AddFoundsScreen';
import { ViewPiggyScreen } from '../pages/founds/ViewPiggyScreen';
import { AboutScreen } from '../pages/home/AboutScreen';
import { CreatePiggyScreen } from '../pages/founds/CreatePiggyScreen';
import Navbar from '../pages/nav/Navbar';
import { HomeScreen } from '../pages/home/HomeScreen';
import { IRootState } from '../redux/store/store';

export const AppRouter = () => {
	const { account, activeDeposit } = useSelector((state: IRootState) => state.wallet);

	return (
		<Router>
			<Navbar />

			<Routes>
				<Route path="/home" element={<HomeScreen />} />
				<Route path="/create" element={<CreatePiggyScreen />} />
				{account?.length > 0 && activeDeposit && (
					<>
						<Route path="/add" element={<AddFoundsScreen />} />
					</>
				)}
				<Route path="/view" element={<ViewPiggyScreen />} />
				<Route path="/about" element={<AboutScreen />} />

				<Route path="/" element={<Navigate to="/home" />} />
				<Route path="*" element={<NotFoundScreen />} />
			</Routes>
		</Router>
	);
};
