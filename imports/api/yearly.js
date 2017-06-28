import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from "meteor/mdg:validated-method";

export const YearlyAverages = new Mongo.Collection("yearlyaverages");

export const removeYearlyAverage = new ValidatedMethod({
    name: "removeYearlyAverage",
    validate(yearlyId) {
        check(yearlyId, String);
    },
    run(yearlyId) {
        return YearlyAverages.remove({_id: yearlyId});
    }
});

YearlyAverages.attachSchema(new SimpleSchema({
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

