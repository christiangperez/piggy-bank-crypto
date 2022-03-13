import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { NotFoundScreen } from '../common/components/NotFoundScreen'
import { AddFoundsScreen } from '../layouts/founds/AddFoundsScreen'
import { ViewPiggyScreen } from '../layouts/founds/ViewPiggyScreen'
import { AboutScreen } from '../layouts/home/AboutScreen'
import { ReleasePiggyScreen } from '../layouts/founds/ReleasePiggyScreen';
import { CreatePiggyScreen } from '../layouts/founds/CreatePiggyScreen'
import Navbar from '../layouts/nav/Navbar'
import { HomeScreen } from '../layouts/home/HomeScreen'

export const AppRouter = () => {
    return (
          <Router>
            <Navbar />

            <Routes>
                <Route path="/home" element={ <HomeScreen /> } />
                <Route path="/create" element={ <CreatePiggyScreen /> } />
                <Route path="/add" element={ <AddFoundsScreen /> } />
                <Route path="/view" element={ <ViewPiggyScreen /> } />
                <Route path="/release" element={ <ReleasePiggyScreen /> } />
                <Route path="/about" element={ <AboutScreen /> } />

                <Route path="/" element={ <Navigate to='/home' /> } />
                <Route path="*" element={ <NotFoundScreen />} />
            </Routes>

          </Router>
      )
}
