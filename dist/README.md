# Timepicker Buttons Panel for Grafana
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

A Grafana panel which allows you to create a list of buttons which set specific times (retrieved from a datasource) on the dashboard's timepicker when clicked.

![Panel Screenshot](https://i.imgur.com/0oC9k7M.png)

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

| Column          | Description                                                                                                                              |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **time_from**   | **Required** A UNIX Timestamp (`Number`) This will set the "From" part of the time range.                                                |
| **time_to**     | _Optional_ A UNIX Timestamp (`Number`) This will set the "To" part of the time range. If this is not supplied, it will default to `now`. |
| **button_text** | _Optional_ What the text inside the button will say. _If this is not supplied, it will default to a locale-formatted timestamp._         |
| **primary**     | _Optional_ `1` (`Number`) will make the button blue/"pop out" (depending on your theme)                                                  |


![Example Screenshot](https://i.imgur.com/EbL6oMv.png)

--------

**Credit**

Logo made by [DinosoftLabs](https://flaticon.com/authors/dinosoftlabs) on [www.flaticon.com](https://flaticon.com)