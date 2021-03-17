import React from 'react';
import { css, cx } from 'emotion';
import { PanelProps, GraphSeriesValue } from '@grafana/data';
import { FullWidthButtonContainer, HorizontalGroup, stylesFactory, VerticalGroup } from '@grafana/ui';
import { TimepickerData } from 'types';
import { getEpochWithMillis, getEpochWithoutMillis } from './utils';
import { SimpleOptions } from './types';
import { TimepickerSelect } from './TimepickerSelect';
import { TimepickerButton } from './TimepickerButton';

interface Props extends PanelProps<SimpleOptions> {}

export const Panel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  // Convert data retrieved from datasource into a data structure we can process into <button> elements
  const buttons: TimepickerData[] = [];
  data.series.forEach((series) => {
    const timeVals: GraphSeriesValue[] = series.fields[0].values.toArray();
    // Create all selectable values, i.e. all frames in the data query response.

    for (let i = 0; i < timeVals.length; i++) {
      let button: TimepickerData = {
        text: series.fields.find((field) => field.name === options.buttonTextOption)?.values.get(i),
        time_from: series.fields.find((field) => field.name === options.timeFromOption)?.values.get(i),
        time_to: series.fields.find((field) => field.name === options.timeToOption)?.values.get(i),
        isCurrentTime: false,
        errors: [],
      };

      // Sanitize isPrimary
      if (typeof options.primaryFieldOption !== 'undefined' && typeof options.primaryFieldValueOption !== 'undefined') {
        let primary = series.fields.find((field) => field.name === options.primaryFieldOption)?.values.get(i);
        if (typeof primary !== 'undefined' && primary !== null) {
          if (primary.toString().match(options.primaryFieldValueOption)) {
            button.isPrimary = true;
          }
        }
      }

      // Sanitize time_from
      if (typeof button.time_from === 'undefined' || button.time_from === null) {
        button.errors.push(`'${options.timeFromOption}' value is required`);
      } else {
        // Check it's a valid UNIX timestamp
        button.time_from = Number(button.time_from);
        if (isNaN(button.time_from)) {
          button.errors.push(`'${options.timeFromOption}' is not a valid UNIX timestamp`);
        } else if (typeof button.text === 'undefined' || button.text === null) {
          // If there's no button_text column then just default to a formatted timestamp appropriate for the user's locale
          button.text = new Date(getEpochWithMillis(button.time_from)).toLocaleString();
        } else {
          // Make sure text is a string
          button.text = String(button.text);
        }
      }

      // Sanitize time_to
      if (typeof button.time_to !== 'undefined' && button.time_to !== null) {
        // Check it's a valid UNIX timestamp
        button.time_to = Number(button.time_to);
        if (isNaN(button.time_to)) {
          button.errors.push(`'${options.timeToOption}' is not a valid UNIX timestamp`);
        }
      }

      // Determine if the Range equals the current Time Range
      const isFromCurrent = getEpochWithoutMillis(button.time_from) === data.timeRange.from.unix();
      const isToCurrent =
        getEpochWithoutMillis(button?.time_to || data.timeRange.to.unix()) === data.timeRange.to.unix();
      button.isCurrentTime = isFromCurrent && isToCurrent;

      buttons.push(button);
    }
  });

  return (
    <div>
      {options.displayStyle === 'dropdown' && <TimepickerSelect timepickerData={buttons} />}

      <div className="gf-form">
        <div
          className={cx(
            styles.wrapper,
            css`
              width: ${width}px;
              height: ${height}px;
            `
          )}
        >
          {options.displayStyle === 'button' && !options.displayButtonsHorizontal && (
            <FullWidthButtonContainer>
              <VerticalGroup spacing={'sm'}>{buttonFactory(buttons)}</VerticalGroup>
            </FullWidthButtonContainer>
          )}
          {options.displayStyle === 'button' && options.displayButtonsHorizontal && (
            <HorizontalGroup spacing={'sm'} wrap={true}>
              {buttonFactory(buttons)}
            </HorizontalGroup>
          )}
        </div>
      </div>
    </div>
  );
};

function buttonFactory(buttons: TimepickerData[]) {
  return buttons.map((button) => (
    <TimepickerButton
      text={button.text}
      time_from={button.time_from}
      time_to={button.time_to}
      isPrimary={button.isPrimary || false}
      isCurrentTime={button.isCurrentTime}
      errors={button.errors}
    />
  ));
}

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
      overflow-y: auto;
      overflow-x: auto;
    `,
  };
});
