import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Text, Input } from "../../components";
import Button from "../../components/Button";

import * as T from "./index.style";

const StartScreen: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("VISITANTE");
  return (
    <T.Container>
      <T.Centering>
        <Text as="h1" variant="outlined" size="xl">
          Lista de pokemons sorteados
        </Text>
        <Input
                required
                placeholder="Digite eseu nome"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNickname(e.target.value.toUpperCase())
                }
              />
        <Button onClick={() => navigate(`/pokemons/${nickname}`)} variant="light">
          Iniciar
        </Button>

      </T.Centering>
      <div style={{ position: "absolute", bottom: 18 }}>
        <Text variant="outlined">&copy;{new Date().getFullYear()} Fernando Fernandes</Text>
      </div>
    </T.Container>
  );
};

export default StartScreen;
