import React from 'react';
import {Modal, TouchableOpacity, View, Text} from 'react-native';
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
const c = 'M-138.944-138.944l277.888 277.888';
const ModalWindowError = (props: {
  onHide: (arg0: boolean) => void;
  show: boolean;
  id: any;
  error: string;
}) => {
  useEffect(() => {
    console.log('props', props.id, props.error);
    setTimeout(() => {
      props.onHide(false);
    }, 1200);
  }, []);
  return (
    <Wrapper>
      <Modal visible={props.show} animationType={'fade'} transparent={true}>
        <WrapperCentered>
          <TouchableOpacity onPress={() => props.onHide(false)}>
            <Text>{'close'}</Text>
          </TouchableOpacity>
          <AnimatedSVGPath
            strokeColor={'red'}
            duration={1200}
            strokeWidth={6}
            height={100}
            width={100}
            scale={0.95}
            delay={0}
            d={c}
          />
        </WrapperCentered>
      </Modal>
    </Wrapper>
  );
};

export {ModalWindowError};
