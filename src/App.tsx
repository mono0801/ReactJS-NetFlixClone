import { QueryClient, QueryClientProvider } from "react-query";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
    const client = new QueryClient();
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter basename="/">
                <Header />
                <Routes>
                    <Route path="/tv" element={<Tv />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/Reactjs-netflixclone" element={<Home />} />
                    <Route path="/movies/:movieId" element={<Home />} />
                </Routes>
            </BrowserRouter>
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
