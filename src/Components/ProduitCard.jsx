// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProduitCard = ({produit}) => {
    
    console.log(produit);
    
    return <>
     <Card  style={{ width: '12rem'}}>
      
      <Card.Body id='bodyCard'>
        <Card.Title>{produit.nom}</Card.Title>
                <Card.Text>
          Prix : {produit.PrixUnitaire} €
        </Card.Text>
        {/* <Link to={`/details/${pokemonC.name}`}> */}
        {/* <Button variant="outline-danger" >Détails</Button> */}
        {/* </Link> */}
      </Card.Body>
    </Card>
    </>;
}
 
export default ProduitCard;