import { Records } from "/imports/api/records.js";

export function checkPotentialRecordTemperature(temperature, fkHourly) {
    const record = Records.findOne();
    if(temperature > record.temperature.high.value) {
        Records.update(record._id, {
            $set: {
                "temperature.high": {
                    value: temperature,
                    date: fkHourly.dateCreated
                }
            }
        });
    } else if (temperature < record.temperature.low.value) {
        Records.update(record._id, {
            $set: {
                "temperature.low": {
                    value: temperature,
                    date: fkHourly.dateCreated
                }
            }
        });
    }
}

export function checkPotentialRecordLux(lux, fkHourly) {
    const record = Records.findOne();
    if(lux > record.luxometer.high.value) {
        Records.update(record._id, {
            $set: {
                "luxometer.high": {
                    value: lux,
                    date: fkHourly.dateCreated
                }
            }
        });
    } else if (lux < record.luxometer.low.value) {
        Records.update(record._id, {
            $set: {
                "luxometer.low": {
                    value: lux,
                    date: fkHourly.dateCreated
                }
            }
        });
    }
}

