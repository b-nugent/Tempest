import { MonthlyAverages } from "/imports/api/monthly.js";
import { YearlyAverages } from "/imports/api/yearly.js";
import { exportData } from "/imports/helpers/server/export-utils.js";

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

export function exportMonthlyAverages(month, year) {
    const startYear = new Date(); // TODO: Temp
    const endYear = new Date(); // TODO: Temp

    const yearData = YearlyAverages.findOne({dateCreated: {$gte: startYear, $lte: endYear}});
    const monthData = MonthlyAverages.find({fkYearly: yearData._id}).sort({dateCreated: 1}).fetch();
    const dataObj = monthData.map(avg => {
        return {
            temperature: avg.temperature,
            barometer: avg.barometer,
            luxometer: avg.luxometer
        }
    });

    return exportData(dataObj);
}

