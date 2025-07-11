import { useEffect, useState } from 'react';
import { employes} from '../services/employeService';
import TableauEmployes from '../Components/TableauEmployes';

const PageEmployes = () => {
  const [employe, setEmploye] = useState([]);

  const recuperationEmployes = async () => {
    try {
      const reponse = await employes();
      setEmploye(reponse.data);
    } catch (error) {
      console.error("Erreur récupération des employés:", error);
    }
  };

  useEffect(() => {
    recuperationEmployes();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Liste des employés</h2>
      <TableauEmployes donnees={employe} />
    </div>
  );
};

export default PageEmployes;
