import React from 'react';
import {View} from 'react-native';
import {AnimatedSVGPath} from 'react-native-svg-animations';
import styled from 'styled-components';

const Loading = () => {
  const WrapperCentered = styled(View)`
    align-items: center;
    align-self: center;
    padding-left: 10px;
    padding-top: 100px;
    justify-content: center;
  `;
  const d =
    'M19.44 24C9.12 24 4 34.64 4 40s5.12 16 15.44 16c15.44 0 25.68-32 41.12-32C70.88 24 76 34.64 76 40s-5.12 16-15.44 16c-15.44 0-25.68-32-41.12-32z';
  return (
    <WrapperCentered>
      <AnimatedSVGPath
        strokeColor={'white'}
        duration={1200}
        strokeWidth={6}
        height={100}
        width={100}
        scale={0.95}
        delay={100}
        d={d}
      />
    </WrapperCentered>
  );
};
export {Loading};
