import { FieldType, PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { FieldSelectEditor } from 'grafana-plugin-support';

import { Panel } from './Panel';

export const plugin = new PanelPlugin<SimpleOptions>(Panel).setPanelOptions(builder => {
  return builder
    .addCustomEditor({
      id: 'timeFromOption',
      path: 'timeFromOption',
      name: 'Time From Field',
      description: 'This will set the "From" part of the time range.',
      defaultValue: 'time_from',
      category: ['Field Mapping'],
      editor: FieldSelectEditor,
      settings: {
        filterByType: [FieldType.number],
      },
    })
    .addCustomEditor({
      id: 'timeToOption',
      path: 'timeToOption',
      name: 'Time To Field',
      description: 'This will set the "To" part of the time range.',
      defaultValue: 'time_to',
      category: ['Field Mapping'],
      editor: FieldSelectEditor,
      settings: {
        filterByType: [FieldType.number],
      },
    })
    .addCustomEditor({
      id: 'buttonTextOption',
      path: 'buttonTextOption',
      name: 'Button Text Field',
      description: 'The field that will be used as the Text for the button',
      defaultValue: 'button_text',
      category: ['Field Mapping'],
      editor: FieldSelectEditor,
    })

    .addCustomEditor({
      id: 'primaryFieldOption',
      path: 'primaryFieldOption',
      name: 'Primary Field',
      description: 'The field used to determine if the button is highlighted',
      defaultValue: 'primary',
      category: ['Field Mapping'],
      editor: FieldSelectEditor,
    })
    .addTextInput({
      path: 'primaryFieldValueOption',
      name: 'Primary Value Regex',
      description: 'Regex value which if matched highlights the button.',
      defaultValue: '1',
      category: ['Field Mapping'],
      showIf: config => typeof config.primaryFieldOption !== 'undefined',
    });
});
