import React, { Component } from 'react';

import './css/TimepickerButton.css';
import { getPrettyDate, getQueryMapo } from './utils';
import { Button } from '@grafana/ui';

interface TimepickerButtonProps {
  text?: string;
  time_from: number;
  time_to?: number;
  primary: boolean;
  errors: string[];
}

export class TimepickerButton extends Component<TimepickerButtonProps> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.errors.length === 0) {
      getQueryMapo(this.props.time_from, this.props.time_to);
    }
  }

  render() {
    return (
      <Button
        icon={this.props.errors.length > 0 ? 'exclamation-triangle' : 'clock-nine'}
        variant={this.props.errors.length > 0 ? 'destructive' : this.props.primary ? 'primary' : 'secondary'}
        onClick={this.handleClick}
      >
        <div>{getTitle(this.props)}</div>
        {getErrors(this.props.errors)}
      </Button>
    );
  }
}
function getTitle(props: TimepickerButtonProps): string {
  if (props.text) {
    return props.text;
  }
  const timeFrom: string = getPrettyDate(props.time_from);
  return timeFrom !== 'now' ? timeFrom : 'Error:';
}

function getErrors(errors: string[]) {
  if (errors.length > 0) {
    return <div>{' ' + errors.join()}</div>;
  }
  return;
}
