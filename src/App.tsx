import AppContainer from './containers/AppContainer';

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="app-name">Kelime Türet</div>
      <div className="app-content">
        <AppContainer />
      </div>
    </div>
  );
};
export default App;
