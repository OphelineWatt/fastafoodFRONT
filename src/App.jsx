import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import NavBar from './Components/NavBar'
import PageAccueil from './Pages/PageAccueil'
import PageEmployes from './Pages/PageEmployes'
import 'bootstrap-icons/font/bootstrap-icons.css';
import PageProduits from './Pages/PageProduits';
import PageStocks from './Pages/PageStocks';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route path="/employes" element={<PageEmployes />} />
        <Route path="/produits" element={<PageProduits/>} />
        <Route path="/stocks" element={<PageStocks/>} />

      </Routes>
    </Router>
  )
}

export default App