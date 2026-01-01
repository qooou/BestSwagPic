import {Container, Row, Col, Card, Button} from "react-bootstrap";
import { useState } from "react";

import type { Description, Votes } from "../interfaces";
import {useNavigate} from "react-router-dom";

interface Props {
  descriptions: Description[],
  votes: Votes,
  totalVotes: number;
}

function WinnerSummary({ descriptions, votes, totalVotes }: Props) {
  const [winner] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("winner") ?? '"0.jpg"');
    } catch {
      return "0.jpg";
    }
  });
  const navigate = useNavigate();

  const vote: number = votes ? votes[winner] : 0;
  const percentage: string = ((vote / totalVotes) * 100).toFixed(2);

  return <Container>
    <Row className="justify-content-center align-items-center">
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card className="text-center" style={{aspectRatio: "1 / 1"}}>
          <h1>🎉Winner🎉</h1>
          <img
            src={`/images/${winner}`}
            alt={descriptions.find((d => d.name === winner))?.description}
            style={{
              height: '70vh',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card className="" >
          <h1>Votes</h1>
          <div className='justify-content-between align-items-center' >
            <progress value={vote/totalVotes}/>
          </div>
          <sub>{vote} votes: {percentage}%</sub>
          <br/>
          <h1>Description</h1>
          <p>{descriptions.find((d => d.name === winner))?.description}</p>
          <Button onClick={() => {navigate('/')}}>Vote Again!</Button>
        </Card>
      </Col>
    </Row>
  </Container>
}

export default WinnerSummary;