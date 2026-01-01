import { Card } from "react-bootstrap";

interface Props {
  title: string,
  name: string,
  description: string,
  vote: number,
  totalVotes:number
}

function ImageSummary({ title, name, description, vote, totalVotes }: Props) {
  const percentage: string = ((vote / totalVotes) * 100).toFixed(2);

  return <>
    <Card>
      <h2>{title}</h2>
      <Card style={{aspectRatio: "1 / 1"}}>
        <img
          src={`/images/${name}`}
          alt={description}
          style={{
            aspectRatio: "1 / 1",
            objectFit: "contain"
          }}
        />
      </Card>
      <progress value={vote/totalVotes}/>
      <sub>{vote} votes: {percentage}%</sub>
      <br/>
      <p>{description}</p>
    </Card>
  </>
}

export default ImageSummary;