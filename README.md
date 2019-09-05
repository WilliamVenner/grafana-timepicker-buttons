# Timepicker Buttons Panel for Grafana
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

A Grafana panel which allows you to create a list of buttons which set specific times (retrieved from a datasource) on the dashboard's timepicker when clicked.

<p align="center">
	<img alt="Panel Screenshot" src="https://i.imgur.com/91PSO4b.png"/>
</p>

--------

## Installation

```bash
sudo service grafana-server stop
cd /var/lib/grafana/plugins
sudo git clone https://github.com/WilliamVenner/grafana-timepicker-buttons
sudo mv grafana-timepicker-buttons williamvenner-timepicker-buttons-panel
sudo chown grafana:grafana williamvenner-timepicker-buttons-panel -R
sudo chmod 774 williamvenner-timepicker-buttons-panel -R
sudo service grafana-server start
```

## Usage

All dates and times should use UTC.

The data returned from the datasource must have the following columns:

| Column          | Description                                                                                                                                                                                          |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **button_text** | **Required**<br>What the text inside the button will say.                                                                                                                                            |
| **time_from**   | **Required**<br>A UNIX Timestamp or [moment.js](https://momentjs.com/) compatible date format.<br>This will set the "From" part of the time range.                                                   |
| **time_to**     | _Optional_<br>A UNIX Timestamp or [moment.js](https://momentjs.com/) compatible date format.<br>This will set the "To" part of the time range.<br>If this is not supplied, it will default to `now`. |

**Don't forget to change "Format as" from "Time series" to "Table."**

![Example Screenshot](https://i.imgur.com/YBisZ7L.png)

--------

<p align="center">
	<b>Credit</b><br>
	Logo made by <a href="https://flaticon.com/authors/dinosoftlabs">DinosoftLabs</a> on <a href="https://flaticon.com">www.flaticon.com</a>
</p>
