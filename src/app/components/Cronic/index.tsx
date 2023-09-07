import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import prisma from '../../../../lib/prisma';

const Container = styled.div`
  border: 3px solid ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: 1.5rem;
  transition: 1s;
  text-align: center;
  padding: 1.36rem;

  &:hover {
    transition: 1s;
    padding: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 1rem;
    padding: 0.8rem;

    &:hover {
      padding: 1rem;
    }
  }
`;

function TextComponent() {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [data, setData] = useState<
    { id: number; title: string; content: string | null }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        if (result) {
          setData(result);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  async function getData() {
    const data = await prisma?.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
    });
    return data;
  }

  const handleMouseEnter = () => {
    setIsTextVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTextVisible(false);
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, 10)); // Ensure font size doesn't go below 10
  };

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        overflow: 'hidden',
        transition: 'max-height 3s ease-in-out',
        maxHeight: isTextVisible ? '100rem' : '6rem',
      }}
    >
      {data.map((item) => (
        <div key={item.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={increaseFontSize}>+</Button>
            <h1>{item.title}</h1>
            <Button onClick={decreaseFontSize}>-</Button>
          </div>
          <p style={{ fontSize: `${fontSize}px`, margin: '5px' }}>
            {item.content}
          </p>
        </div>
      ))}
    </Container>
  );
}

export default TextComponent;
