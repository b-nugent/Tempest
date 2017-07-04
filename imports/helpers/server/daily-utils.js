import { DailyAverages } from "/imports/api/daily.js";
import { MonthlyAverages } from "/imports/api/monthly.js";
import { getCurrentMonth, getDaysInMonth } from "/imports/helpers/server/time-utils";

export function calculateDailyAverage() {
    const daysInCurrentMonth = getDaysInMonth(getCurrentMonth());
    const dailyAverages = DailyAverages.find({}, {dateCreated: 1}).limit(daysInCurrentMonth).fetch();

    const monthlyAverages = {
        temperature: _.reduce(_.pluck(dailyAverages, "temperature")) / dailyAverages.length,
        barometer: _.reduce(_.pluck(dailyAverages, "barometer")) / dailyAverages.length,
        luxometer: _.reduce(_.pluck(dailyAverages, "luxometer")) / dailyAverages.length
    };

    const monthlyId = MonthlyAverages.insert(monthlyAverages);
    MonthlyAverages.update({_id: {$in: _.pluck(monthlyAverages, "_id")}}, {
        $set: { fkMonthly: monthlyId }
    });
}
