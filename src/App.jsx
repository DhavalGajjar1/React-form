
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Show from './Pages/Show'
import Header from './pages/Header'
import Update from './pages/update'
import './style.css';


function App() {

  return (
    <div>
    <BrowserRouter>
    <Header/>
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/show' element={<Show />} />
         <Route path='/updateData/:index' element={<Update />} />
         

      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
