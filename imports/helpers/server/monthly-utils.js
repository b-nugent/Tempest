import { MonthlyAverages } from "/imports/api/monthly.js";
import { YearlyAverages } from "/imports/api/yearly.js";

export function calculateMonthlyAverage() {
    const monthlyAverages = MonthlyAverages.find({}, {dateCreated: 1}).limit(12).fetch();

    const yearlyAverages = {
        temperature: _.reduce(_.pluck(monthlyAverages, "temperature")) / monthlyAverages.length,
        barometer: _.reduce(_.pluck(monthlyAverages, "barometer")) / monthlyAverages.length,
        luxometer: _.reduce(_.pluck(monthlyAverages, "luxometer")) / monthlyAverages.length
    };

    const yearlyId = YearlyAverages.insert(yearlyAverages);
    MonthlyAverages.update({_id: {$in: _.pluck(MonthlyAverages, "_id")}}, {
        $set: { fkYearly: yearlyId }
    });
}

