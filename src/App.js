import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar'
import './App.scss';

function App() {
  return (
    <div className="app">
      {/* <h1>Slack Clone</h1> */}

      {/* Header */}
      <Header />
      <div className="app__body">
        {/* Sidebar */}
        <Sidebar />
        {/* Chat screen -> React router */}
      </div>
    </div>
  );
}

export default App;
