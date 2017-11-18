import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Records = new Mongo.Collection("records");

const RecordDataSchema = new SimpleSchema({
    value: {
        type: Number
    },

    date: {
        type: Date
    }
});

const RecordBoundsSchema = new SimpleSchema({
    high: {
        type: RecordDataSchema
    },

    low: {
        type: RecordDataSchema
    }
});

Records.attachSchema(new SimpleSchema({
    temperature: {
        type: RecordBoundsSchema
    },

    barometer: {
        type: RecordBoundsSchema
    },

    luxometer: {
        type: RecordBoundsSchema
    }
}));


