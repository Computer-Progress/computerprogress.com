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
            <stop offset="5%" stopColor="#4e33ff" />
            <stop offset="50%"  stopColor="#9E1FFF" />
          </linearGradient>
        </defs>
      </Wave>
      <TextWrapper>
        <Text>Understand the growing computational burden in the history of computer progress.</Text>
      </TextWrapper>
    </>
  );
}
