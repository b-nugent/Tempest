import { SimpleSchema } from "meteor/aldeed:simple-schema";

export class Average {
    constructor(doc) {
        _.extend(this, doc);
    }

    getTemperature() {
        return this.temperature;
    }

    getBarometricPressure() {
        return this.barometer;
    }

    getLuminosity() {
        return this.luxometer;
    }
}

export const AveragesSchema = new SimpleSchema({
    temperature: {
        type: Number
    },

    barometer: {
        type: Number
    },

    luxometer: {
        type: Number
    },

    dateCreated: {
        type: Date,
        autoValue: function () {
            if(this.isInsert) {
                return new Date();
            } else {
                this.unset();
            }
        }
    }
});
