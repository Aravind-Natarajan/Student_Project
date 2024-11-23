import './App.css'
import Home from './components/home'
import Adminpage from './components/adminpage';
import Studentreg from './components/studentreg';
import { Routes, Route } from "react-router-dom";


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} >
        <Route index path='/' element={<Studentreg />} />
        <Route path='/reg' element={<Studentreg />} />
        <Route path='/admin' element={<Adminpage />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
