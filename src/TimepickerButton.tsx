import React, { Component } from 'react';
import { UrlQueryMap } from '@grafana/data';
import { getLocationSrv } from '@grafana/runtime';

import './css/TimepickerButton.css';

interface TimepickerButtonProps {
  text?: string;
  time_from: number;
  time_to?: number;
  primary?: boolean;
  errors: string[];
}

export class TimepickerButton extends Component<TimepickerButtonProps> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.errors.length === 0) {
      // Build a UrlQueryMap consisting of the time_from (UNIX ms timestamp) and time_to (UNIX ms timestamp) that will be passed into LocationUpdate
      let queryMap: UrlQueryMap = { from: this.props.time_from * 1000, to: 'now' };
      if (typeof this.props.time_to !== 'undefined' && this.props.time_to !== null && !isNaN(this.props.time_to)) {
        queryMap.to = this.props.time_to * 1000;
      }

      // Push a LocationUpdate to the LocationSrv with our UrlQueryMap
      getLocationSrv().update({
        partial: true,
        replace: true,
        query: queryMap,
      });
    }
  }

  render() {
    return (
      <button
        className={
          'timepicker-btn ' +
          'btn ' +
          (this.props.errors.length > 0 ? 'btn-danger' : this.props.primary === true ? 'btn-primary' : 'btn-secondary')
        }
        onClick={this.handleClick}
      >
        {this.props.text}
        {this.props.errors.map(error => (
          <div className="error">{error}</div>
        ))}
      </button>
    );
  }
}
