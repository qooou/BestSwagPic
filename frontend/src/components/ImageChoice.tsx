import { Card, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';

import config from '../config';

interface Props {
  name: string,
  windowHeight: number,
  setImageCards: Dispatch<SetStateAction<string[]>>
}

function ImageChoice({ name, windowHeight, setImageCards }: Props) {
  const navigate = useNavigate();

  const handleNextRound = () => {
    const imagesChoice: [string, string][] = JSON.parse(sessionStorage.getItem('imagesChoice') ?? '[]');
    const imagesNextRound: string[] = JSON.parse(sessionStorage.getItem('imagesNextRound') ?? '[]');
    let imageNow: [string, string];

    imagesNextRound.push(name);
    // Last round, next round
    if (!imagesChoice.length) {
      // Last round
      if (imagesNextRound.length === 1) {

        fetch(config.api.endpoints.vote, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
          })
        })
        .then(res => {
          console.log(`voted ${name}: ${res.status}`);
          navigate('/stats');
        })

        sessionStorage.setItem('imagesChoice', JSON.stringify([]));
        sessionStorage.setItem('imagesNextRound', JSON.stringify([]));
        sessionStorage.setItem('imageNow', JSON.stringify([]));
        sessionStorage.setItem('winner', JSON.stringify(name));
        return ;
      }

      for(let i = 0; i < imagesNextRound.length; i+=2) {
        imagesChoice.push([imagesNextRound[i], imagesNextRound[i+1]]);
      }

      imageNow = imagesChoice[imagesChoice.length - 1];
      setImageCards(imagesChoice[imagesChoice.length - 1]);
      imagesChoice.pop();
      sessionStorage.setItem('imagesChoice', JSON.stringify(imagesChoice));
      sessionStorage.setItem('imagesNextRound', JSON.stringify([]));
      sessionStorage.setItem('imageNow', JSON.stringify(imageNow));
      return ;
    }

    imageNow = imagesChoice[imagesChoice.length - 1];
    setImageCards(imagesChoice[imagesChoice.length - 1]);
    imagesChoice.pop();

    sessionStorage.setItem('imagesChoice', JSON.stringify(imagesChoice));
    sessionStorage.setItem('imagesNextRound', JSON.stringify(imagesNextRound));
    sessionStorage.setItem('imageNow', JSON.stringify(imageNow));

  }

  return <>
    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
      <Card
        style={{
          height: windowHeight * 0.9,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
        onClick={handleNextRound}
      >
        <AnimatePresence mode="wait">
          <motion.img
            src={`/images/${name}`}
            alt="just a pic"
            style={{
              maxHeight: windowHeight * 0.9,
              maxWidth: "100%",
              objectFit: "contain"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{x: 100}}
          />
        </AnimatePresence>
      </Card>
    </Col>
  </>
}

export default ImageChoice
