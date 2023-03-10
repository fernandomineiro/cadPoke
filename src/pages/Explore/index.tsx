import React, { useState, createRef, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { Text, Button, Loading, Navbar, PokeCard, Modal } from "../../components";
import { IPokemon, IAllPokemonResponse } from "../../libs/types/pokemon";
import { useGlobalContext } from "../../libs/context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as T from "./index.style";
import styled from "@emotion/styled";
import { units } from "../../libs/utils";
import { NavItem } from "../../components";
const Explore: React.FC = () => {
  const { name } = useParams();
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [pokeUrl, setPokeURL] = useState<string>(
    `${import.meta.env.VITE_POKEMON_API}?limit=60&offset=0`
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numberStart, setNumberStart] = useState<number>(5);
  const [numberEnd, setNumberEnd] = useState<number>(Math.floor(200* Math.random() + 1));
  const [navHeight, setNavHeight] = useState<number>(0);
  const { state } = useGlobalContext();
  const navRef = createRef<HTMLDivElement>();
  const shouldLog = useRef(true);

  const InnerNav = styled("div")({
    display: "flex",
    gap: units.spacing.base,
  });

  const OuterNav = styled("nav")({
    padding: units.spacing.base,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    gap: units.spacing.base,
    margin: "0 auto",
    "@media (min-width: 640px)": {
      width: "80vh",
    },
  });

  const GradientBakcdrop = styled("div")({
    position: "fixed",
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const toShuffle = () => {

    let currentIndex = pokemons.length,  randomIndex;


    while (currentIndex != 0) {
  

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [pokemons[currentIndex], pokemons[randomIndex]] = [
        pokemons[randomIndex], pokemons[currentIndex]];
    }
  
    setPokemons([...pokemons])
    console.log(pokemons)

  }
  const loadPokemons= async(x=true) => {
    let answerNumber = numberStart
  
    if (pokeUrl) {
      try {
        if (x ==false){
          if(numberStart < 8){
            answerNumber = answerNumber +1
          
            console.log(answerNumber)
          }else{
            alert('Só pode ter até 8 cartas')
            return
          }
          
        }
        setIsLoading(true);
        setPokemons([])

       

        const { data } = await axios.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=${answerNumber}&offset=${numberEnd}`);
        data.results?.map(async (result:any) => {
          const { data } = await axios.get<any>(`https://pokeapi.co/api/v2/pokemon/${result.name}`);

          const mapped =  {name: data.name,
          image: data.sprites.back_default,
          description: `Pokemon com experiencia de ${data.base_experience}`,
          points: Math.floor(10* Math.random() + 1), 
          }

          setPokemons((prevState) => [...prevState, mapped]);

          
        });

        answerNumber <= 8 ? setNumberStart(answerNumber):  alert('Só pode ter até 8 cartas')

        console.log(pokemons)


      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      setNavHeight(navRef.current?.clientHeight!);
      loadPokemons();
    }
  });

  return (
    <>
      <T.Container style={{ marginBottom: navHeight }}>
        <Text as="h1" variant="darker" size="lg">
          Seja bem vindo ao jogo de cartas {name}
        </Text>
        <T.Grid>
          {pokemons.length
            ? pokemons.map((pokemon: IPokemon) => (
              <>
                 <Text
                  key={`${pokemon.name}-${Math.random()}`}
                 
                  style={{ display: "flex" }}>
                  <PokeCard nickname={pokemon.name} name={pokemon.description} image={pokemon.image} points={pokemon.points}/>
                </Text> 
          </>
              ))
            : null}
        </T.Grid>
         {!isLoading ? (
          pokeUrl && (
           <GradientBakcdrop
      style={{
        height: 124,
        background:
          "linear-gradient(180deg, #FDFDFD 0%, rgba(253, 253, 253, 0) 0.01%, rgba(253, 253, 253, 0.97) 30.37%, #FDFDFD 100%)",
      }}
      >
      <OuterNav>
        
        <InnerNav>
          <Button onClick={()=>loadPokemons(false)}> Nova carta </Button>
          <Button variant="light" onClick={()=>toShuffle()}> Embaralhar </Button>
        </InnerNav>
      </OuterNav>
    </GradientBakcdrop>
          )
        ) : (
          <Loading label="Espere por favor..." />
        )} 
      </T.Container>

      
    </>
  );
};

export default Explore;
