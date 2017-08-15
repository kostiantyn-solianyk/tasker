import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart,
  ResponsiveContainer,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  {name: 'Page A', uv: 590, pv: 800, amt: 1400},
  {name: 'Page B', uv: 868, pv: 967, amt: 1506},
  {name: 'Page C', uv: 1397, pv: 1098, amt: 989},
  {name: 'Page D', uv: 1480, pv: 1200, amt: 1228},
  {name: 'Page E', uv: 1520, pv: 1108, amt: 1100},
  {name: 'Page F', uv: 1400, pv: 680, amt: 1700}
];

export default class Chart extends Component {

  render() {
    const {tasks} = this.props;

    return (
      <ResponsiveContainer width='75%' aspect={4.0}>
        <ComposedChart data={data}>
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip/>
          <Legend/>
          <CartesianGrid stroke='#f5f5f5'/>
          <Bar dataKey='uv' name="Period of the day" barSize={20} fill='#3249c7'/>
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

Chart.propTypes = {};