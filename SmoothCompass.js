import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import LPF from 'lpf';

let ScreenHeight = Dimensions.get('window').height;

class CompassPointer extends Component {
  _magnetometerSubscription;

  constructor(props) {
    super(props);
    this.state = {
      degree: 0,
    };
    LPF.init([]);
    LPF.smoothing = 0.2;
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = async () => {
    CompassHeading.start(5, ({heading, accuracy}) => {
      this.setState({degree: heading});
    });
    // if (Magnetometer.isAvailableAsync()) {
    //   Magnetometer.setUpdateInterval(16);
    //   this._magnetometerSubscription = Magnetometer.addListener(sensorData => {
    //     this.setState({degree: this._angle(sensorData)});
    //   });
    // } else {
    //   console.log('Magnetometer not available!');
    // }
  };

  _unsubscribe = () => {
    this._magnetometerSubscription.remove();
    this._magnetometerSubscription = null;
  };

  _angle = magnetometer => {
    let angle = 0;
    if (magnetometer) {
      let {x, y} = magnetometer;
      angle = Math.atan2(y, x) * (180 / Math.PI);
    }
    return Math.round(LPF.next(this._hysteresis(angle)));
  };

  _hysteresis = angle => {
    if (Math.abs(this.state.degree - angle) >= 180) {
      if (angle >= 0) {
        return angle - 360;
      }
      if (angle < 0) {
        return 360 + angle;
      }
    } else {
      return angle;
    }
  };

  render() {
    return (
      <View>
        <Image
          style={[
            this.styles.compassImage,
            {transform: [{rotate: 360 - this.state.degree + 'deg'}]},
          ]}
          source={require('./compass.png')}
        />
      </View>
    );
  }

  styles = StyleSheet.create({
    compassImage: {
      width: ScreenHeight / 4,
      height: ScreenHeight / 4,
      borderRadius: ScreenHeight / 8,
    },
  });
}
export default CompassPointer;
