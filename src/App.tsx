import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./Components/Navigation/Footer";
import Header from "./Components/Navigation/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
    const client = new QueryClient();
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Header />
                <Routes>
                    <Route path="/tv" element={<Tv />} />
                    <Route path="/tv/:category/:Id" element={<Tv />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/search/*" element={<Search />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/movies/:category/:Id" element={<Home />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
