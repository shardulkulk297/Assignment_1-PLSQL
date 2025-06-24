import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from "./components/UserLayout"
import UserList from "./components/UserList"

function App() {
  
  return (
    <>
      <Toaster position="top-center"/>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout/>}>
            <Route index element={<UserList/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
