import { Template } from 'meteor/templating';
import { Recipes } from '/imports/api/recipe/RecipeCollection';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.Profile_Recipe.onCreated(function onCreated() {
  this.subscribe(Recipes.getPublicationName());
});

Template.Profile_Recipe.helpers({
  /**
   * @returns {*} True if recipe username is same as logged in user's username
   */
  createdBy: function createdBy() {
    if (!Meteor.user()) {
      console.log('not logged in');
      return false;
    }

    // Check that the current user is accessing a page in their area.
    const loggedInUser = Meteor.user().profile.name;
    const recipeCreator = Template.instance().data.recipe.username;
    return loggedInUser === recipeCreator;
  },
});

Template.Profile_Recipe.events({
  'click .delete-button'(event) {
    const username = Meteor.user().profile.name;
    const recipeIdentity = Template.instance().data.recipe.identity;
    event.preventDefault();
    FlowRouter.go(`/${username}/delete/${recipeIdentity}`);
  },
  'click .edit-button'(event) {
    const username = Meteor.user().profile.name;
    const recipeIdentity = Template.instance().data.recipe.identity;
    event.preventDefault();
    FlowRouter.go(`/${username}/edit/${recipeIdentity}`);
  },

});

