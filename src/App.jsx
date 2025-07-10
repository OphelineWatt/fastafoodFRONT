import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import NavBar from './Components/NavBar'
import PageAccueil from './Pages/PageAccueil'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PageAccueil />} />
      </Routes>
    </Router>
  )
}

export default App