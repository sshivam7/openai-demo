import './App.css';
import InputForm from './components/InputForm';
import ResponseList from './components/ResponseList';

function App() {
  return (
    <div className="background">
      <h1>Story Prompt: Fun with AI</h1>

      <div className="main-features">
        <InputForm />
        <ResponseList />
      </div>
    </div>
  );
}

export default App;
