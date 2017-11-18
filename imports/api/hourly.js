import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Average, AveragesSchema } from "/imports/api/average.js";

export const HourlyAverages = new Mongo.Collection("hourlyaverages", {
    transform(doc) {
        return new Average(doc);
    }
});

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

HourlyAverages.attachSchema(AveragesSchema);
HourlyAverages.attachSchema(new SimpleSchema({
    fkDaily: {
        type: String,
        optional: true
    }
}));
