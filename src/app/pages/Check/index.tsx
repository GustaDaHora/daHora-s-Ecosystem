import React, { useState } from 'react';
import { Header } from 'src/app/components/Header';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0;
  padding: 0;
  font: 3vh Arial, Helvetica, sans-serif;

  footer {
    color: ${({ theme }) => theme.COLORS.WHITE};
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    position: relative;
    bottom: 0px;
    text-align: center;
    width: 100%;
    padding: 3vh;
    margin-top: 0.5rem;
  }

  section {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    padding: 5vh;
    margin: 5vh 0vh;
    color: black;
    background-color: whitesmoke;
    border-radius: 10px;
    box-shadow: 4px 4px 4px #0000006b;
  }
`;

const ResultContainer = styled.div`
  margin: 4vh;
`;

export function Tables(): React.ReactElement {
  const [valores, setValores] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');

  const isNumero = (n: string): boolean => {
    const num = Number(n);
    return num >= 1 && num <= 100;
  };

  const inList = (n: string, l: number[]): boolean => {
    return l.indexOf(Number(n)) !== -1;
  };

  const adicionar = () => {
    if (isNumero(inputValue) && !inList(inputValue, valores)) {
      const newValue = Number(inputValue);
      setValores([...valores, newValue]);
      setInputValue('');
    } else {
      window.alert('Valor inválido');
    }
  };

  const finalizar = () => {
    if (valores.length === 0) {
      window.alert('Adicione números');
    } else {
      const total = valores.length;
      const maior = Math.max(...valores);
      const menor = Math.min(...valores);
      const soma = valores.reduce((acc, curr) => acc + curr, 0);
      const media = soma / total;

      // Update your UI with the results here
    }
  };

  return (
    <Container>
      <Header>
        <h1>Analisador de números</h1>
      </Header>
      <section>
        <div className="test">
          <p>
            Numero entre 1 e 100:{' '}
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />{' '}
            <input type="button" value="ADICIONAR" onClick={adicionar} />
          </p>
          <div>{/* Render options here */}</div>
          <input type="button" value="FINALIZAR" onClick={finalizar} />
        </div>
        <ResultContainer>{/* Render results here */}</ResultContainer>
      </section>
      <footer>&copy;daHora</footer>
    </Container>
  );
}