# Timepicker Buttons Panel for Grafana
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

A Grafana panel which allows you to create a list of buttons which set specific times (retrieved from a datasource) on the dashboard's timepicker when clicked.

<p align="center">
	<img alt="Panel Screenshot Vertical Buttons" src="https://i.imgur.com/ft77DQM.png"/>
	<img alt="Panel Screenshot Dropdown List" src="https://i.imgur.com/1XvGim1.png"/>
	<img alt="Panel Screenshot Horizontal Buttons" src="https://i.imgur.com/qUAIQF9.png"/>
</p>

--------

## Compatibility

This plugin works with Grafana 7.0.0 and up.

For older versions, check out the [releases](https://github.com/WilliamVenner/grafana-timepicker-buttons/releases) page.

--------

## Installation

```bash
sudo service grafana-server stop
cd /var/lib/grafana/plugins
sudo git clone https://github.com/WilliamVenner/grafana-timepicker-buttons
sudo mv grafana-timepicker-buttons williamvenner-timepickerbuttons-panel
sudo chown grafana:grafana williamvenner-timepickerbuttons-panel -R
sudo chmod 774 williamvenner-timepickerbuttons-panel -R
sudo service grafana-server start
```

--------

## Usage

### Display Style Configuration
The timepicker can be configured to display buttons (vertically or horizontally), or as a dropdown list.

<br>
<p align="center">
  <img alt="Panel Options Buttons" src="https://i.imgur.com/9wuLCiW.png"/>
  <img alt="Panel Options Dropdown List" src="https://i.imgur.com/glaCfLy.png"/>
</p>
<br>

### Field Mapping
All dates and times should use UTC.

**The data returned from the datasource must be formatted as a _Table_**, not a _Time Series_.

The panel can be configured to map fields to the button properties:

<br>
<p align="center">
  <img alt="Panel Options" src="https://i.imgur.com/IioqIhH.png"/>
</p>
<br>

The data fields returned from the datasource should be mapped with the following panel configuration settings:

| Column               | Default Value | Description                                                                                                                                         |
|----------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Time From Field**   | time_from    | **Required**<br>A UNIX Timestamp (`Number`)<br>This will set the "From" part of the time range.<br>The value can include or exclude ms. Example: 1612413008000 or 1612413008  |
| **Time To Field**     | time_to      | _Optional_<br>A UNIX Timestamp (`Number`)<br>This will set the "To" part of the time range.  <br>The value can include or exclude ms. Example: 1612413008000 or 1612413008<br>_If this is not supplied, it will default to `now`._ |
| **Button Text Field** | button_text  | _Optional_<br>What the text inside the button will say.<br>_If this is not supplied, it will default to a locale-formatted timestamp._              |
| **Primary Field**     | primary      | _Optional_<br>Field used to determine if the button will be highlighted (blue/"pop out" depending on your theme)                                                          |
| **Primary Value**     | 1            | _Optional_<br>A Regex pattern to perform on the `Primary Field`. If matched the button will be highlighted.                                                         |

<br>

<p align="center">
  <img alt="Example Screenshot" src="https://i.imgur.com/EbL6oMv.png"/>
</p>

<br>

--------

<p align="center">
	<b>Credit</b><br>
	Logo made by <a href="https://flaticon.com/authors/dinosoftlabs">DinosoftLabs</a> on <a href="https://flaticon.com">www.flaticon.com</a>
</p>
