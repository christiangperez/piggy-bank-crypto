import { Provider } from "react-redux";
import { store } from './redux/store/store';

const App = () => {
  return (
    <Provider store={ store }>
      <div>
        <h1>Piggy Bank Crypto</h1>
      </div>
    </Provider>
  );
}

export default App;
