import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
    const client = new QueryClient();
    return (
        <QueryClientProvider client={client}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/tv" element={<Tv />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/movies/:movieId" element={<Home />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

// function App() {
//     return (
//         <Router basename="/ReactJS-NetFlixClone/">
//             <Header />
//             <Routes>
//                 <Route path="/tv" element={<Tv />} />
//                 <Route path="/search" element={<Search />} />
//                 <Route path="/" element={<Home />}>
//                     <Route path="movies/:movieId" element={<Home />} />
//                 </Route>
//             </Routes>
//         </Router>
//     );
// }

export default App;
