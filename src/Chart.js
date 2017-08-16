import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default class Chart extends Component {

  generateTimes(length, callback) {
    for (let i = 0; i < length; i++) {
      callback(i)
    }
  }

  generateCharts() {
    const {tasks} = this.props;
    const charts = [];

    this.generateTimes(24, i => {
      charts[i] = {
        hour: i,
        value: 0
      }
    });

    tasks.map(task => {
      const timeStart = new Date(task.timeStartInDateFormat);
      const timeEnd = new Date(task.timeEndInDateFormat);

      if (timeStart.getDate() === new Date().getDate()) {
        const timeStartInHour = timeStart.getHours();
        const diffInMinutes = (timeEnd - timeStart) / 1000 / 60;

        if (diffInMinutes > 60) {
          const currentValue = 60 - timeStart.getMinutes();
          charts[timeStartInHour].value += currentValue;
          let newDiff = diffInMinutes - currentValue;
          let newStep = timeStartInHour + 1;

          while (newDiff >= 60) {
            charts[newStep].value += newDiff >= 60 ? 60 : newDiff;
            newDiff = newDiff - 60;
            newStep++;
          }

          if (newDiff < 60) {
            charts[newStep].value += newDiff;
          }
        } else {
          charts[timeStartInHour].value += diffInMinutes;
        }
      }
    });

    return charts;
  }

  render() {
    const charts = this.generateCharts();

    return (
      <ResponsiveContainer width='75%' aspect={4.0}>
        <ComposedChart data={charts}>
          <XAxis dataKey="hour"/>
          <YAxis type="number" domain={[0, 60]}/>
          <Tooltip/>
          <Legend/>
          <CartesianGrid stroke='#f5f5f5'/>
          <Bar dataKey="value" name="Time" barSize={20} fill='#3249c7'/>
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

Chart.propTypes = {
  tasks: PropTypes.array
};