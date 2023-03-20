// Independent from danfo.tsx and danfo2.tsx

import { useEffect } from "react";
import * as dfd from "danfojs";

function App() {
  useEffect(() => {
    const df = new dfd.DataFrame(
      { pig: [20, 18, 489, 675, 1776], horse: [4, 25, 281, 600, 1900] },
      { index: [1990, 1997, 2003, 2009, 2014] }
    );
    df.plot("plot_div").table();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div id="plot_div"></div>
      </header>
    </div>
  );
}

export default App;
