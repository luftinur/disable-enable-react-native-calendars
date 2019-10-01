/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, View, Text, StatusBar} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

const DAYS_EN = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

// MONDAY, THURSDAY, FRIDAY
const activeDays = [0, 3, 4];

class App extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const currentMonth = date.getMonth();
    const year = date.getFullYear();
    this.state = {
      initDays: this.getDays(currentMonth, year),
      markDates: this.getDays(currentMonth, year),
    };

    this.onDayPress = this.onDayPress.bind(this);
  }

  onDayPress(day) {
    this.setState(prevState => ({
      markDates: {...prevState.initDays, [day.dateString]: {selected: true}},
    }));
  }

  // Populate days in month
  getDays(month, year) {
    let start = moment()
      .month(month)
      .year(year)
      .startOf('month');
    const end = moment()
      .month(month)
      .year(year)
      .endOf('month');

    let dates = {};
    const disabled = {disabled: true, selected: false};
    while (start.isBefore(end)) {
      DAYS_EN.forEach((day, i) => {
        if (!activeDays.includes(i)) {
          dates[start.day(day).format('YYYY-MM-DD')] = disabled;
        }
      });
      start.add(7, 'days');
    }
    return dates;
  }

  render() {
    const today = new Date();
    return (
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        <View>
          <Text style={{textAlign: 'center', padding: 10, fontSize: 18}}>Disable/Enable Days Calendar</Text>

          <Calendar
            minDate={today}
            theme={{
              textSectionTitleColor: '#000000',
              selectedDayBackgroundColor: 'red',
              selectedDotColor: 'green',
            }}
            onDayPress={this.onDayPress}
            markedDates={this.state.markDates}
            onMonthChange={date => {
              this.setState({
                initDays: this.getDays(date.month - 1, date.year),
                markDates: this.getDays(date.month - 1, date.year),
              });
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
export default App;
