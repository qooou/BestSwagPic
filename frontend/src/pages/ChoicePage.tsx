import { useState, useEffect } from 'react'
import {Container, Card, Col, Row} from 'react-bootstrap';
import config from '../config';
import ImageChoice from "../components/ImageChoice.tsx";

function shuffleArray(array: []) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initChoiceAImages(images: []): [string, string][] {
  shuffleArray(images);

  const result: [string, string][] = [];
  for(let i = 0; i < images.length; i+=2) {
    result.push([images[i], images[i+1]]);
  }

  return result;
}

function ChoicePage() {

  const [imageCards, setImageCards] = useState<string[]>([]);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

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
      let imagesChoice: [string, string][] = JSON.parse(sessionStorage.getItem('imagesChoice') ?? '[]');
      let imageNow: [string, string] = JSON.parse(sessionStorage.getItem('imageNow') ?? '[]');

      imagesChoice = imagesChoice.length ? imagesChoice : initChoiceAImages(data.files);

      // Already playing, continue from last choice
      if (imageNow.length > 0) {
        setImageCards(imageNow);
        return ;
      }

      imageNow = imagesChoice[imagesChoice.length - 1];
      setImageCards(imagesChoice[imagesChoice.length - 1]);
      imagesChoice.pop();
      sessionStorage.setItem('imagesChoice', JSON.stringify(imagesChoice));
      sessionStorage.setItem('imageNow', JSON.stringify(imageNow));
    })

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const numOfChoices: number = JSON.parse(sessionStorage.getItem('imagesChoice') ?? '[]').length;
  const numOfNextRound: number = JSON.parse(sessionStorage.getItem('imagesNextRound') ?? '[]').length + 1;
  const candidate: number = numOfNextRound + numOfChoices;

  return <>
    <Container>
      <Row>
        <Col>
          <Card className="text-center p-1 bg-dark text-white rounded">
            <h1>Best Swag Pic {candidate * 2}강 {numOfNextRound}/{candidate}</h1>
          </Card>
        </Col>
      </Row>
    </Container>
    <Container fluid>
      <Row>
        {
          imageCards.map((image) => (
            <ImageChoice
              key={image}
              name={image}
              windowHeight={windowHeight}
              setImageCards={setImageCards}
            />
          ))
        }
      </Row>
    </Container>
  </>
}

export default ChoicePage
