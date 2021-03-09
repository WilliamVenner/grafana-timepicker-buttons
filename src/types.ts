export type TimepickerData = {
  text: string;
  time_from: number;
  time_to?: number;
  isPrimary?: boolean;
  isCurrentTime: boolean;
  errors: string[];
};

export interface SimpleOptions {
  displayStyle: string;
  displayButtonsHorizontal: boolean;
  timeFromOption: string;
  timeToOption?: string;
  buttonTextOption?: string;
  primaryFieldOption?: string;
  primaryFieldValueOption?: string;
}
