import { PanelPlugin } from '@grafana/data';
import { Panel } from './Panel';

export const plugin = new PanelPlugin<>(Panel);
