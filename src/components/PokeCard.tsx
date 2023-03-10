import React, { HTMLAttributes } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "@emotion/styled";
import { Text } from ".";
import { colors } from "../libs/utils";

interface IPokeCard extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  nickname?: string;
  image?: string;
  sprite?: string;
  points?: any;
}

const getStyle = ({ nickname }: IPokeCard) => {
  return `
  .capture-qty,
  button {
    position: absolute;
    top: 4px;
    right: 8px;
    display: flex;
    gap: 4px;
    align-items: center;
  }
  cursor: ${nickname ? "default" : "pointer"};
  &:hover {
    background-color: ${nickname ? colors["gray-100"] : colors["gray-200"]};
  }
  &:active::after {
    box-shadow: inset ${nickname ? "-4px -4px" : "4px 4px"} ${colors["gray-300"]};
  }
  img {
    margin: 0 auto;
  }
  `;
};

const PixelatedPokemonCard = styled("div")((props: IPokeCard) => getStyle(props));

const PokeCard: React.FC<IPokeCard> = ({ name, nickname, image, sprite, points }) => {
  return (
    <PixelatedPokemonCard nickname={nickname} className="pxl-border">
      {nickname && (
        <>
          <LazyLoadImage src={image} alt={name} width={96} height={96} />
          <Text variant="darker" size="lg">
            {nickname}
          </Text>
        </>
      )}
      <Text>pontos: {points}</Text>
      {name}
    </PixelatedPokemonCard>
  );
};

export default PokeCard;
