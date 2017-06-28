import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
    // Starts the automated time-based methods.
    SyncedCron.start();
});