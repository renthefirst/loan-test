import { Route, Routes } from 'react-router-dom';
import './styles/styles.scss';
import FormStep1 from './components/FormStep1/FormStep1';
import FormStep2 from './components/FormStep2/FormStep2';
import FormStep3 from './components/FormStep3/FormStep3';
import MainPage from './components/MainPage/MainPage';


function App() {
  return (
    <Routes>
      <Route path="*" element={<MainPage />} />
      <Route path="/step-1" element={<FormStep1 />} />
      <Route path="/step-2" element={<FormStep2 />} />
      <Route path="/step-3" element={<FormStep3 />} />
    </Routes>
  );
}

export default App;
