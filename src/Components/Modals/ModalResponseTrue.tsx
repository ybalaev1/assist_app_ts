import React from 'react';
import {Modal, View} from 'react-native';
import styled from 'styled-components';
import {AnimatedSVGPath} from 'react-native-svg-animations';
import {useEffect} from 'react';

const Wrapper = styled(View)`
  background-color: ${props => props.theme.blue};
  box-shadow: 1px 1px 100px rgba(0, 0, 255, 0.2);
`;
const WrapperCentered = styled(View)`
  background-color: ${props => props.theme.blue};
  position: absolute;
  top: 30%;
  bottom: 50%;
  left: 22%;
  right: 22%;
  border: 0;
  border-radius: 20px;
  box-shadow: 1px 1px 100px rgba(0, 0, 255, 0.2);
  align-items: center;
  justify-content: center;
`;
const f =
  'M81.7,17.8C73.5,9.3,62,4,49.2,4C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3';

const ModalWindowCheck = (props: {
  onHide: (arg0: boolean) => void;
  show: boolean;
}) => {
  useEffect(() => {
    setTimeout(() => {
      props.onHide(false);
    }, 2800);
  }, []);
  return (
    <Wrapper>
      <Modal visible={props.show} animationType={'fade'} transparent={true}>
        <WrapperCentered>
          <AnimatedSVGPath
            strokeColor={'white'}
            duration={2800}
            strokeWidth={6}
            height={100}
            width={100}
            scale={0.95}
            delay={0}
            d={f}
          />
        </WrapperCentered>
      </Modal>
    </Wrapper>
  );
};

export {ModalWindowCheck};
