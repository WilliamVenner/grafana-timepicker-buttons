import React, { Component } from 'react';

import './css/TimepickerButton.css';
import { TimepickerData } from './types';
import { getQueryMapo, getPrettyDate } from './utils';
import { Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';

interface TimepickerSelectProps {
  timepickerData: TimepickerData[];
}

export class TimepickerSelect extends Component<TimepickerSelectProps> {
  handleChange = (selectedOption: SelectableValue) => {
    const selected: TimepickerData = this.props.timepickerData[selectedOption.value];
    getQueryMapo(selected.time_from, selected.time_to);
  };

  render() {
    return (
      <Select
        onChange={this.handleChange}
        options={this.props.timepickerData.map((option, index) => ({
          label: option.errors.length > 0 ? 'Error' : option.text || getPrettyDate(option.time_from),
          value: index,
          icon: 'plus-square',
          description: option.errors.join() || getPrettyDate(option.time_from) + ' to ' + getPrettyDate(option.time_to),
        }))}
      />
    );
  }

  // render() {
  //   return (
  //     <select style={{ width: '100%' }} onChange={this.handleChange}>
  //       <option hidden disabled selected>
  //         -- select an date --
  //       </option>
  //       <option disabled>-- select an date --</option>
  //
  //       {this.props.timepickerData.map((option, index) => (
  //         <option key={index} value={index}>
  //           {option.text}
  //         </option>
  //       ))}
  //     </select>
  //   );
  // }
}
