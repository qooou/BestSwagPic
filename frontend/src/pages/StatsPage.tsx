import { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";

import config from "../config.ts";
import ImageSummary from "../components/ImageSummary.tsx";
import WinnerSummary from "../components/WinnerSummary.tsx";
import type { Description, Votes } from "../interfaces";

function StatsPage() {
  const [images, setImages] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<Description[]>([]);
  const [votes, setVotes] = useState<Votes>();
  let totalVotes = 0;

  useEffect(() => {
    fetch(config.api.endpoints.images, {
      method: 'GET',
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then(data => {
      console.log(data.files)
      setImages(data.files);
    });

    fetch(config.api.endpoints.descriptions, {
      method: 'GET',
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(data => {
        console.log("description", data.descriptions)
        setDescriptions(data.descriptions);
      });


    fetch(config.api.endpoints.vote, {
      method: 'GET',
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(votes => {
        console.log("vote", votes);
        setVotes(votes);
      });
  }, []);

  if (votes !== undefined) {
    for (const vote in votes) {
      totalVotes += votes[vote];
    }
  }

  return <>
    <WinnerSummary
      descriptions={descriptions}
      votes={votes ?? {}}
      totalVotes={totalVotes}
    />
    <Container>
      <h1>Gallery</h1>
      <Row>
        {
          images.map(name => (
            <Col key={name} xs={12} sm={12} md={6} lg={4} xl={3}>
              <ImageSummary
                title={descriptions.find((d => d.name === name))?.title ?? ''}
                name={name}
                description={descriptions.find((d => d.name === name))?.description ?? ''}
                vote={votes ? votes[name] : 0}
                totalVotes={totalVotes}
              />
            </Col>
          ))
        }
          </Row>
    </Container>
  </>
}

export default StatsPage;