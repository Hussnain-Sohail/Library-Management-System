import { Routes, Route } from "react-router-dom"
import WelcomeUser from "./WelcomeUser"
import SignUp from "./SignUp"
import LogIn from "./LogIn"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomeUser />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<LogIn />} />
      </Routes>
    </div>
  )
}
export default App
