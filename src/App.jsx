import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import NavBar from './Components/NavBar'
import PageAccueil from './Pages/PageAccueil'
import PageEmployes from './Pages/PageEmployes'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route path="/employes" element={<PageEmployes />} />
      </Routes>
    </Router>
  )
}

export default App