// Import necessary components and files
import Grid from "./Components/Grid";
import "./App.css";

// Function to create a JSX component that renders everything onto the DOM
const App = () => {
  return (
    <div className="App">
      <h1>Pathfinding Visualiser</h1>
      <Grid></Grid>
    </div>
  );
};

export default App;
