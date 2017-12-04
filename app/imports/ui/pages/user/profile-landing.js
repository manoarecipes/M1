import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Template.Profile_Landing.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.context = Profiles.getSchema().namedContext('Profile_Page');
});

Template.Profile_Landing.helpers({
  routeUserName() {
    return FlowRouter.getParam('username');
  },
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
});
