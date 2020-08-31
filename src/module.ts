import _ from 'lodash';
import moment from 'moment';
import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';

import './css/timepicker-btns.css';

// Workaround for weird error when importing @grafana/data
// No idea why it doesn't like importing it but all that's needed from it is this:
let toUtc = function(input) {
	return moment.utc(input);
};

export class TimepickerBtnCtrl extends MetricsPanelCtrl {
	static templateUrl = 'partials/timepicker-btns.html';
	static scrollable = true;

	panelDefaults: any = {transform: 'timeseries_to_columns'};

	/** @ngInject */
	constructor($scope: any, $injector: any) {
		super($scope, $injector);
		_.defaultsDeep(this.panel, this.panelDefaults);

		this.events.on('data-received', this.onDataReceived.bind(this));
		this.events.on('data-error', this.noDataReceived.bind(this));
		this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
	}

	private elements: any = {};

	noDataReceived() {
		this.elements.timepickerNoData.css('display', 'block');
	}

	onDataReceived(data) {
		this.elements.timepickerBtnsContainer.find('.plugin-timepicker-btn').remove();
		if (!data || data.length === 0) {
			this.noDataReceived();
		} else {
			this.elements.timepickerNoData.css('display', 'none');

			let valid_data = false;
			data.forEach(query => {
				query.rows.forEach(row => {
					let btn_metadata: any = {};

					row.forEach((val, column_index) => {
						let column_name = query.columns[column_index].text;
						switch(column_name) {
							case 'time_from':
								let unix_time_from = Number(val);
								btn_metadata.time_from = unix_time_from ? val * 1000 : val;
								break;
							
							case 'time_to':
								let unix_time_to = Number(val);
								btn_metadata.time_to = unix_time_to ? val * 1000 : val;
								break;
							
							case 'button_text':
								btn_metadata.button_text = val;
								break;
						}
					});

					if ('time_from' in btn_metadata && 'button_text' in btn_metadata && toUtc(btn_metadata.time_from) && (!('time_to' in btn_metadata) || toUtc(btn_metadata.time_to))) {
						this.elements.timepickerBtnTemplate.clone()
						.removeAttr('id')
						.data('time-from', btn_metadata.time_from)
						.data('time-to', btn_metadata.time_to)
						.text(btn_metadata.button_text)
						.appendTo(this.elements.timepickerBtnsContainer);
	
						valid_data = true;
					}
				});
			});

			if (!valid_data) this.noDataReceived();
		}
	}

	link(scope: any, elem: any, attrs: any, ctrl: any) {
		this.elements.timepickerNoData = elem.find('#plugin-timepicker-btn-nodata');
		this.elements.timepickerBtnsContainer = elem.find('#plugin-timepicker-btns');
		this.elements.timepickerBtnTemplate = elem.find('#plugin-timepicker-btn-template');
		
		this.elements.timepickerBtnsContainer.on('click', '.plugin-timepicker-btn', function() {
			let time_from = $(this).data('time-from');
			let time_to = $(this).data('time-to');

			let time_from_moment = toUtc(time_from);
			let time_to_moment = time_to === undefined ? undefined : toUtc(time_to);

			ctrl.timeSrv.setTime({ from: time_from_moment.isValid() ? time_from_moment : time_from, to: time_to_moment === undefined ? 'now' : time_to_moment.isValid() ? time_to_moment : time_to});
		});
	}
}

export { TimepickerBtnCtrl as PanelCtrl }
