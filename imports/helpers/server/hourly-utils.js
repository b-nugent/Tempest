import { HourlyAverages } from "/imports/api/hourly.js";
import { DailyAverages } from "/imports/api/daily.js";

export function calculateHourlyAverage() {
    const hourlyAverages = HourlyAverages.find({}, {dateCreated: 1}).limit(24).fetch();

    const dailyAverages = {
        temperature: _.reduce(_.pluck(hourlyAverages, "temperature")) / hourlyAverages.length,
        barometer: _.reduce(_.pluck(hourlyAverages, "barometer")) / hourlyAverages.length,
        luxometer: _.reduce(_.pluck(hourlyAverages, "luxometer")) / hourlyAverages.length
    };

    const dailyId = DailyAverages.insert(dailyAverages);
    HourlyAverages.update({_id: {$in: _.pluck(hourlyAverages, "_id")}}, {
        $set: { fkDaily: dailyId }
    });
}