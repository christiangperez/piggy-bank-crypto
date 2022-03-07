import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NotFoundScreen } from '../common/components/NotFoundScreen'
import { AboutScreen } from '../layouts/home/AboutScreen'
import { HomeScreen } from '../layouts/home/HomeScreen'

export const AppRouter = () => {
    return (
          <Router>
              <Routes>
                  {/* <Route path="/converter" element={ <ConverterScreen /> } /> */}
                  <Route path="/about" element={ <AboutScreen /> } />
                  {/* <Route path="/coin/:idCoin" element={ <CoinScreen /> } /> */}
  
                  <Route path="/" element={ <HomeScreen /> } />
                  <Route path="*" element={ <NotFoundScreen />} />
              </Routes>
          </Router>
      )
}
