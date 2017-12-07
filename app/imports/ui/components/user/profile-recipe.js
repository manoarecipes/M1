import { Template } from 'meteor/templating';
import { Recipes } from '/imports/api/recipe/RecipeCollection';
import { Meteor } from 'meteor/meteor';

Template.If_Authorized.helpers({
  /**
   * @returns {*} True if Meteor is in the process of logging in.
   */
  createdBy: function createdBy() {
    return Meteor.user().profile.name == ;
  },
});


Template.Profile_Recipe.onCreated(function onCreated() {
  this.subscribe(Recipes.getPublicationName());
});

Template.Profile_Recipe.helpers({

});
