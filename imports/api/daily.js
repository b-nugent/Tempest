import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from "meteor/mdg:validated-method";

export const DailyAverages = new Mongo.Collection("dailyaverages");

export const removeDailyAverage = new ValidatedMethod({
    name: "removeDailyAverage",
    validate(dailyId) {
        check(dailyId, String);
    },
    run(dailyId) {
        return DailyAverages.remove({_id: dailyId});
    }
});

DailyAverages.attachSchema(new SimpleSchema({
    fkMonthly: {
        type: String,
        optional: true
    },

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
            if (this.isInsert) {
                return new Date();
            } else {
                this.unset();
            }
        }
    }
}));

