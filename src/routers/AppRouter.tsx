import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { NotFoundScreen } from '../common/components/NotFoundScreen';
import { AddFoundsScreen } from '../features/founds/pages/AddFoundsScreen';
import { ViewPiggyScreen } from '../features/founds/pages/ViewPiggyScreen';
import { AboutScreen } from '../features/home/pages/AboutScreen';
import { CreatePiggyScreen } from '../features/founds/pages/CreatePiggyScreen';
import Navbar from '../features/nav/Navbar';
import { HomeScreen } from '../features/home/pages/HomeScreen';
import { IRootState } from '../redux/store/store';
import { DevelopmentScreen } from '../features/home/pages/DevelopmentScreen';

export const AppRouter = () => {
  const { account, activeDeposit } = useSelector(
    (state: IRootState) => state.wallet
  );

  return (
    <div className='element'>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/home' element={<HomeScreen />} />
          <Route path='/create' element={<CreatePiggyScreen />} />
          {account?.length > 0 && activeDeposit && (
            <>
              <Route path='/add' element={<AddFoundsScreen />} />
            </>
          )}
          <Route path='/view' element={<ViewPiggyScreen />} />
          <Route path='/about' element={<AboutScreen />} />
          <Route path='/development' element={<DevelopmentScreen />} />

          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='*' element={<NotFoundScreen />} />
        </Routes>
      </Router>
    </div>
  );
};
