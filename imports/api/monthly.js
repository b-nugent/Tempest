import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from "meteor/mdg:validated-method";

export const MonthlyAverages = new Mongo.Collection("monthlyaverages");

export const removeMonthlyAverage = new ValidatedMethod({
    name: "removeMonthlyAverage",
    validate(monthlyId) {
        check(monthlyId, String);
    },
    run(monthlyId) {
        return MonthlyAverages.remove({_id: monthlyId});
    }
});

MonthlyAverages.attachSchema(new SimpleSchema({
    fkYearly: {
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
