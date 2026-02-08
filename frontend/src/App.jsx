import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./NavBar";
import Body from "./Body";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
