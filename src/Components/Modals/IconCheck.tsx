import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

const IconCheck = () => {
  return (
    <Svg width={154} height={154}>
      <G fill="none" stroke="#22AE73" strokeWidth={2}>
        <Circle
          cx={77}
          cy={77}
          r={72}
          strokeDasharray="480px,480px"
          strokeDashoffset={960}
        />
        <Circle
          fill="#22AE73"
          cx={77}
          cy={77}
          r={72}
          strokeDasharray="480px,480px"
          strokeDashoffset={960}
        />
        <Path
          stroke="#fff"
          strokeWidth={10}
          strokeDasharray="100px,100px"
          strokeDashoffset={200}
          d="M43.5 77.8l20.2 20.1 48.5-48.5"
        />
      </G>
    </Svg>
  );
};

export default IconCheck;
