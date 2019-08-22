import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';


import Header from '~/components/Header';
import Tabs from '~/components/tabs';
import Menu from '~/components/menu';

import {
  Container,
  Annotation,
  Content,
  Card,
  Description,
  Title,
  CardFooter,
  CardContent,
  CardHeader,
} from './styles';

export default function Main() {
  const translateY = new Animated.Value(0);
  let offset = 0;

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY
        }
      }
    ],
    {
      useNativeDriver: true
    });

  onHandlerStateChanged = (event) => {
    if (event.nativeEvent.oldSate === State.ACTIVE) {
      const { translationY } = event.nativeEvent;
      let opened = false;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
      }

      Animated.timing(translateY, {
        toValue: opened ? 300 : 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => {
        offset = opened ? 300 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Menu translateY={translateY} />

        <PanGestureHandler
          onGestureEvent={this.animatedEvent}
          onHandlerStateChange={this.onHandlerStateChanged}
        >
          <Card style={{
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [-350, 0, 300],
                  outputRange: [-50, 0, 300],
                  extrapolate: 'clamp'
                })
              }
            ]
          }}>
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <Icon name="visibility-off" size={28} color="#666" />
            </CardHeader>
            <CardContent>
              <Title>Saldo disponível</Title>
              <Description>R$ 197.611,65</Description>
            </CardContent>
            <CardFooter>
              <Annotation>
                Transferência de R$20,00 recebida de Ronaldo
            </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>

      </Content>
      <Tabs translateY={translateY} />
    </Container>
  );
}
