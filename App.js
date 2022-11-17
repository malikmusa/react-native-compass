/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import LPF from 'lpf';
import CompassPointer from './SmoothCompass';

const App = () => {
  const [rotateDeg, setRotateDeg] = useState(0);
  useEffect(() => {
    const degree_update_rate = 1;

    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      setRotateDeg(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  return (
    <>
      <View
        style={{
          width: '100%',
          height: Dimensions.get('window').height - 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 3,
            height: 45,
          }}
          resizeMode="cover"
          source={require('./verticle_line.png')}
        />
        <View
          style={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24,
          }}>
          <Image
            style={{
              width: '42%',
              height: Dimensions.get('window').height / 4.5,
            }}
            resizeMode="contain"
            source={require('./plus.png')}
          />

          <Image
            style={[
              styles.image,
              {
                transform: [{rotate: `${360 - rotateDeg}deg`}],
                transition: '30000ms linear all',
                position: 'absolute',
              },
            ]}
            resizeMode="contain"
            source={require('./compass.png')}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 40, fontWeight: '600'}}>
          {360 - rotateDeg + '\u00b0'}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('window').height / 2.5,
  },
});
export default App;
