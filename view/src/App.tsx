import { Routes, Route } from "react-router-dom"
import WelcomeUser from "./WelcomeUser"
import SignUp from "./SignUp"
import LogIn from "./LogIn"
import HomePage from "./HomePage"
import Protector from "./Protect"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomeUser />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<LogIn />} />
        <Route path="/homepage" element={<Protector><HomePage /></Protector>} />
      </Routes>
    </div>
  )
}
export default App
