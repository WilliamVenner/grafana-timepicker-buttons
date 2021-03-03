import React, { Component } from 'react';

import './css/TimepickerButton.css';
import { getPrettyDate, changeTimeRange } from './utils';
import { Button, IconName } from '@grafana/ui';

interface TimepickerButtonProps {
  text?: string;
  time_from: number;
  time_to?: number;
  isPrimary: boolean;
  isCurrentTime: boolean;
  errors: string[];
}

export class TimepickerButton extends Component<TimepickerButtonProps> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.errors.length === 0) {
      changeTimeRange(this.props.time_from, this.props.time_to);
    }
  }

  render() {
    return (
      <Button
        icon={getIcon(this.props)}
        variant={this.props.errors.length > 0 ? 'destructive' : this.props.isCurrentTime ? 'primary' : 'secondary'}
        onClick={this.handleClick}
      >
        <div>{getTitle(this.props)}</div>
        {getErrors(this.props.errors)}
      </Button>
    );
  }
}

function getIcon(props: TimepickerButtonProps): IconName {
  if (props.errors.length > 0) {
    return 'exclamation-triangle';
  }
  if (props.isPrimary) {
    return 'star';
  }
  return 'clock-nine';
}

function getTitle(props: TimepickerButtonProps): string {
  if (props.text) {
    return props.text;
  }
  const timeFrom: string = getPrettyDate(props.time_from);
  return timeFrom !== 'now' ? timeFrom : 'Error';
}

function getErrors(errors: string[]) {
  if (errors.length > 0) {
    return <div>{' - Errors: ' + errors.join()}</div>;
  }
  return;
}
