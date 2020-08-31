# Timepicker Buttons Panel for Grafana
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

A Grafana panel which allows you to create a list of buttons which set specific times (retrieved from a datasource) on the dashboard's timepicker when clicked.

<p align="center">
	<img alt="Panel Screenshot" src="https://i.imgur.com/0oC9k7M.png"/>
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

All dates and times should use UTC.

**The data returned from the datasource must be formatted as a _Table_**, not a _Time Series_.

The data returned from the datasource must have the following columns:

| Column          | Description                                                                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **time_from**   | **Required**<br>A UNIX Timestamp (`Number`)<br>This will set the "From" part of the time range.                                                     |
| **time_to**     | _Optional_<br>A UNIX Timestamp (`Number`)<br>This will set the "To" part of the time range.<br>_If this is not supplied, it will default to `now`._ |
| **button_text** | _Optional_<br>What the text inside the button will say.<br>_If this is not supplied, it will default to a locale-formatted timestamp._              |
| **primary**     | _Optional_<br>`1` (`Number`) will make the button blue/"pop out" (depending on your theme)                                                          |

![Example Screenshot](https://i.imgur.com/EbL6oMv.png)

--------

<p align="center">
	<b>Credit</b><br>
	Logo made by <a href="https://flaticon.com/authors/dinosoftlabs">DinosoftLabs</a> on <a href="https://flaticon.com">www.flaticon.com</a>
</p>