import React, { Component } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
const { width } = Dimensions.get('screen')
import moment, { relativeTimeThreshold } from "moment";
import { locationGet } from "../../../Components/Helper/LocationGet";

function Timer({ interval, style }) {
  const pad = n => (n < 10 ? "0" + n : n); // hien thi giao dien so co 2 chu so
  const duration = moment.duration(interval);
  // const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={styles.timerContainer}>
      <Text style={{ fontSize: 30 }}>{pad(duration.hours())}:</Text>
      <Text style={{ fontSize: 30 }}>{pad(duration.minutes())}:</Text>
      <Text style={{ fontSize: 30 }}>{pad(duration.seconds())} </Text>
      {/* <Text style={style}>{pad(centiseconds)}</Text> */}
    </View>
  );
}
function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
function Lap({ number, interval, fastest, slowest }) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest
  ];
  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
    </View>
  );
}
function LapsTable({ laps, timer }) {
  const finishedLaps = laps.slice(1);
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap < min) min = lap;
      if (lap > max) max = lap;
    });
  }
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={index === 0 ? timer + lap : lap}
          fastest={lap === min}
          slowest={lap === max}
        />
      ))}
    </ScrollView>
  );
}
function ButtonsRow({ children }) {
  return <View style={styles.buttonsRow}>{children}</View>;
}
class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      now: 0,
      laps: []
    };
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  start = () => {
    this.props.chatngeLoacationStart()
    this.props.getLocation('Started')
    //  alert('Started')
    //  console.log('Started')

    // this.props.getLocation()
    const now = new Date().getTime();

    this.setState({
      start: now,
      now,
      laps: [0]
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };

  lap = () => {
    const timestamp = new Date().getTime();
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,
      now: timestamp
    });
  };

  stop = () => {
    this.props.chatngeLoacationStop()
    this.props.getLocation('Pause')
    //  alert('Pause')
     console.log('Pause')
    clearInterval(this.timer);
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0
    });
  };
  reset = () => {
    this.props.chatngeLoacationStop()
    this.props.getLocation('Completed')
    // alert('Completed')
    console.log('Completed')
    this.setState({
      laps: [],
      start: 0,
      now: 0
    });
  };
  resume = () => {
    this.props.chatngeLoacationStart()
    this.props.getLocation('Play')
    //  alert('play')
     console.log('play')
    const now = new Date().getTime();
    this.setState({
      start: now,
      now
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };
  render() {
    const { now, start, laps } = this.state;
    const timer = now - start;
    return (
      <View style={styles.container}>
        <Timer
          interval={laps.reduce((total, curr) => total + curr, 0) + timer}
          style={{
            ...styles.timer, backgroundColor: 'green',
            justifyContent: 'center', alignItems: 'center'
          }}
        />

        {laps.length === 0 && (
          <>
            <TouchableOpacity
              onPress={this.start}
              style={{...styles.pause, backgroundColor:'#35BDD0'}}>
              <Text style={{ color: 'white', fontWeight: '800' }}>Sart</Text>
            </TouchableOpacity>
            {/* <ButtonsRow>
             <RoundButton
              title="Lapp"
              color="#8B8B90"
              background="#151515"
              disabled
            /> 
            <RoundButton
              title="Start"
              color="#50D167"
              background="#1B361F"
              onPress={this.start}
            />
          </ButtonsRow> */}
          </>

        )}
        {start > 0 && (
          <>
            {/* <ButtonsRow>
             <RoundButton
              title="Lap"
              color="#FFFFFF"
              background="#3D3D3D"
              onPress={this.lap}
            /> 
            <RoundButton
           
              title="Pause"
              color="#E33935"
              background="#3C1715"
              onPress={this.stop}
            >
          </RoundButton>
          </ButtonsRow> */}
            <TouchableOpacity
              onPress={this.stop}
              style={{...styles.pause,backgroundColor: '#E03B8B',}}>
              <Text style={{ color: 'white', fontWeight: '800' }}>Pause</Text>
            </TouchableOpacity>
          </>

        )}
        {laps.length > 0 && start === 0 && (
          <>
            <TouchableOpacity
              onPress={this.reset} style={styles.completed}>
              <Text style={{ color: 'white', fontWeight: '800' }}>Completed</Text>
            </TouchableOpacity>
            {/* <View style={{
              width: width, height: 140, position: 'absolute',
              justifyContent: "space-between",

              alignItems: 'center',

              left: 0, bottom: 0, right: 0
            }}>
              <ButtonsRow>
                 <RoundButton
              title="Reset"
              color="#FFFFFF"
              background="#3D3D3D"
              onPress={this.reset}
            /> 
                <RoundButton
                  title="Resume"
                  color="#50D167"
                  background="#1B361F"
                  onPress={this.resume}
                />
              </ButtonsRow>
            </View> */}
            <TouchableOpacity
              onPress={this.resume} style={{...styles.pause, backgroundColor: '#3ed015',}}>
              <Text style={{ color: 'white', fontWeight: '800' }}>Resume</Text>
            </TouchableOpacity>
          </>
        )}
        {/* <LapsTable laps={laps} timer={timer} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,


    alignItems: "center",

    paddingHorizontal: 20
  },
  timer: {
    color: "red",
    fontSize: 60,
    fontWeight: "200",
    width: 110,
    alignSelf: 'center'
  },
  button: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 25

  },
  buttonTitle: {
    fontSize: 18
  },
  // buttonBorder: {
  //   width: 76,
  //   height: 76,
  //   borderRadius: 38,
  //   borderWidth: 1,
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  // buttonsRow: {
  //   flexDirection: "row",
  //   alignSelf: "stretch",
  //   justifyContent: "space-between",
  //   marginTop: 80,
  //   marginBottom: 30
  // },
  lapText: {
    color: "#FFFFFF",
    fontSize: 18
  },
  lapTimer: {
    width: 30
  },
  lap: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#151515",
    borderTopWidth: 1,
    paddingVertical: 10
  },
  scrollView: {
    alignSelf: "stretch"
  },
  fastest: {
    color: "#4BC05F"
  },
  slowest: {
    color: "#CC3531"
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',

    width: '80%',
    height: 50
  },
  completed: {
    width: 100, height: 40,
    borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'red', position: 'absolute',
    top: 10, right: 10
  },
  pause: {
    width: 130, height: 40,
    borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    position: 'absolute',
    bottom: 30, right: 10
  }
});
export default Count;
