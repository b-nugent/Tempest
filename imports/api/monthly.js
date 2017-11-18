import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Average, AveragesSchema } from "/imports/api/average.js";

export const MonthlyAverages = new Mongo.Collection("monthlyaverages", {
    transform(doc) {
        return new Average(doc);
    }
});

export const removeMonthlyAverage = new ValidatedMethod({
    name: "removeMonthlyAverage",
    validate(monthlyId) {
        check(monthlyId, String);
    },
    run(monthlyId) {
        return MonthlyAverages.remove({_id: monthlyId});
    }
});

MonthlyAverages.attachSchema(AveragesSchema);
MonthlyAverages.attachSchema(new SimpleSchema({
    fkYearly: {
        type: String,
        optional: true
    }
}));
