import { calculateHourlyAverage } from "/imports/helpers/server/hourly-utils.js";
import { calculateDailyAverage } from "/imports/helpers/server/daily-utils.js";
import { calculateMonthlyAverage } from "/imports/helpers/server/monthly-utils.js";

export function getCurrentDay() {
    return new Date().getDay();
}

export function getCurrentMonth() {
    return new Date().getMonth();
}

export function getCurrentYear() {
    return new Date().getYear();
}

export function getDaysInMonth(month, year = getCurrentYear()) {
    return new Date(year, month, 0).getDate();
}

SyncedCron.add({
    name: "transferHourlyData",
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text("every day");
    },
    job: function() {
        return calculateHourlyAverage();
    }
});

SyncedCron.add({
    name: "transferDailyData",
    schedule: function(parser) {
        return parser.text("every month");
    },
    job: function() {
        return calculateDailyAverage();
    }
});

SyncedCron.add({
    name: "transferMonthlyData",
    schedule: function(parser) {
        return parser.text("every year");
    },
    job: function() {
        return calculateMonthlyAverage();
    }
});

