import { Meteor } from "meteor/meteor";
import { HourlyAverages } from "/imports/api/hourly.js";
import { DailyAverages } from "/imports/api/daily.js";
import { MonthlyAverages } from "/imports/api/monthly.js";
import { YearlyAverages } from "/imports/api/yearly.js";

Meteor.publish("hourlyaverages", function() {
    return HourlyAverages.find();
});

Meteor.publish("dailyaverages", function() {
    return DailyAverages.find();
});

Meteor.publish("monthlyaverages", function() {
    return MonthlyAverages.find();
});

Meteor.publish("yearlyaverages", function() {
    return YearlyAverages.find();
});