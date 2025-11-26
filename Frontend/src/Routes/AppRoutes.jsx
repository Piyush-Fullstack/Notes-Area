import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateNote from '../Pages/CreateNote'
import ShowNotes from '../Pages/ShowNotes'
import UpdateNote from '../Pages/UpdateNote'


const AppRoutes = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<CreateNote/>}></Route>
                <Route path='/show-notes' element={<ShowNotes/>}></Route>
                <Route path='update-note/:id' element={<UpdateNote/>}></Route>
            </Routes>
        </Router>
    </div>
  )
}

export default AppRoutes