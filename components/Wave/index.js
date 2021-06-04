import { useState, useEffect } from 'react';
import { Wave, Text, TextWrapper } from './styles';
import theme from "../../styles/theme";

export default () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimated(true);
    }, 2000);
  }, [])

  return (
    <>
      <Wave fill="url(#gradient)"
        paused={animated}
        options={{
          height: 50,
          amplitude: 20,
          speed: 0.7,
          points: 3
        }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(0)">
            <stop offset="60%"  stopColor="#8f00ff" />
            <stop offset="100%" stopColor="#2000e5" />
          </linearGradient>
        </defs>
      </Wave>
      <TextWrapper>

      <Text>Understand the growing computational burden in the history of computer progress.</Text>
      </TextWrapper>
    </>
  );
}

