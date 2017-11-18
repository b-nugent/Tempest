import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Average, AveragesSchema } from "/imports/api/average.js";

export const YearlyAverages = new Mongo.Collection("yearlyaverages", {
    transform(doc) {
        return new Average(doc);
    }
});

export const removeYearlyAverage = new ValidatedMethod({
    name: "removeYearlyAverage",
    validate(yearlyId) {
        check(yearlyId, String);
    },
    run(yearlyId) {
        return YearlyAverages.remove({_id: yearlyId});
    }
});

YearlyAverages.attachSchema(AveragesSchema);
