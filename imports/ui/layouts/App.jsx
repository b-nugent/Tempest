import React from "react";
import WeatherChart from "/imports/ui/components/weather-chart.jsx";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>This is the App.</h1>
                <WeatherChart />
            </div>
        );
    }
}
