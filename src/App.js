import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar'
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <Sidebar />
        {/* Chat screen -> React router */}
      </div>
    </div>
  );
}

export default App;
