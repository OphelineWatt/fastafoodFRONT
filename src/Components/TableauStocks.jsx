const TableauStock = () => {
    return ( <Table
    responsive striped bordered hover className="table-personnalisee"
    >
      <thead>
        <tr style={{ backgroundColor: "#DF9328", color: "#fff" }}>
          <th>Rôle</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          {/* tu as accès uniquement quand tu es admin  */}
          {roleId === 1 && <th>Gestion</th>}
        </tr>
      </thead>
      <tbody>
        {donnees.map((employe, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#FCEED6" : "#FFF5E8" }}>
     <td>{employe.libelle}</td>
    <td >{employe.nom}</td>
    <td >{employe.prenom}</td>
    <td >{employe.email}</td>
    
            {/* {roleId === 1 && (
    <td>
    <div className="d-flex justify-content-center gap-2">
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => gestionSuppression(employe.idEmploye)}
        className="btn-poubelle d-flex align-items-center gap-1"
      >
        <i className="bi bi-trash"></i> Supprimer
      </Button>
    
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => gestionOuvertureModal(employe)}
        className="btn-modifier d-flex align-items-center gap-1"
      >
        <i className="bi bi-pencil-square"></i> Modifier 
      </Button>
    </div>
    
    </td>
    
            )} */}
          </tr>
        ))}
      </tbody>
    </Table> );
}
 
export default TableauStock;