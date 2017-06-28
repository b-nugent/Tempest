import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from "meteor/mdg:validated-method";

export const HourlyAverages = new Mongo.Collection("hourlyaverages");

export const insertHourlyAverage = new ValidatedMethod({
    name: "insertHourlyAverage",
    validate({doc}){
        check(doc, {
            temperature: Number,
            barometer: Number,
            luxometer: Number
        });
    },
    run({doc}) {
        return HourlyAverages.insert(doc);
    }
});

export const removeHourlyAverage = new ValidatedMethod({
    name: "removeHourlyAverage",
    validate(hourlyId) {
        check(hourlyId, String);
    },
    run(hourlyId) {
        return HourlyAverages.remove({_id: hourlyId});
    }
});

HourlyAverages.attachSchema(new SimpleSchema({
    fkDaily: {
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
