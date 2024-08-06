import { useState } from "react";
import type { TCard } from "../../types";
import { Button } from "../ui/button";

type CardProps = {
  front: TCard["front"];
  back: TCard["back"];
};

const Card = ({ front, back }: CardProps) => {
  const [flipped, setFlipped] = useState(false);

  let content;

  if (flipped) content = <div>{back}</div>;
  else content = <div>{front}</div>;

  return (
    <div>
      {content}
      <Button onClick={() => setFlipped(!flipped)}>flip</Button>
    </div>
  );
};

export default Card;
