import React, { Component } from 'react';

import './css/TimepickerButton.css';
import { TimepickerData } from './types';
import { changeTimeRange, getPrettyDate } from './utils';
import { Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';

interface TimepickerSelectProps {
  timepickerData: TimepickerData[];
}

export class TimepickerSelect extends Component<TimepickerSelectProps> {
  handleChange = (selectedOption: SelectableValue) => {
    const selected: TimepickerData = this.props.timepickerData[selectedOption.value];
    changeTimeRange(selected.time_from, selected.time_to);
  };

  render() {
    return (
      <Select
        onChange={this.handleChange}
        options={this.props.timepickerData.map((option, index) => ({
          label: option.errors.length > 0 ? 'Error' : option.text || getPrettyDate(option.time_from),
          value: index,
          description: option.errors.join() || getPrettyDate(option.time_from) + ' to ' + getPrettyDate(option.time_to),
        }))}
      />
    );
  }
}
