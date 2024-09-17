import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage'
import ViewJobSheet from './Components/ViewJobSheet';
import UpdateJobSheet from './Components/UpdateJobSheet';
import CreateJobSheet from './Components/CreateJobSheet';

function App() {

  return (
    <>
   <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreateJobSheet />} />
                <Route path="/view/:id" element={<ViewJobSheet />} />
                <Route path="/update/:id" element={<UpdateJobSheet />} />
            </Routes>
        </Router>
      
    </>
  )
}

export default App
