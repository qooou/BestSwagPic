import { Button, Card } from "react-bootstrap";
import {useNavigate} from "react-router-dom";


function NoMatch() {
  const navigate = useNavigate();

  return <>
    <Card >
      <h1>Handsome Swag is SIMPING🐶. Swag NOT FOUND.</h1>
      <Button onClick={()=>{navigate('/')}}>Vote Here!</Button>
    </Card>
  </>
}

export default NoMatch;