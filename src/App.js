import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './comp/store/layout/Header';
import Dashboard from './comp/wm/Dashboard';
import Store from './comp/store/Store';
import Charecter from './comp/store/Charecter';
import Info from './comp/store/Info';

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/wm" element={ <Dashboard/> } />
          <Route path="/" element={ <Store/> } />
          <Route path="/info" element={ <Info /> } />
          <Route path="/character/:id" element={<Charecter />}  />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
