import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css';
import OceanMap from './components/OceanMap'; 


function App() {
  return (
    <div className="App">
      <h1>BlueSteps Ocean Map</h1>
      <OceanMap />
    </div>
  );
}

export default App;
