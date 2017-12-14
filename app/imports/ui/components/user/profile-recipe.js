import { Template } from 'meteor/templating';
import { Recipes } from '/imports/api/recipe/RecipeCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.Profile_Recipe.onCreated(function onCreated() {
  this.subscribe(Recipes.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
});

Template.Profile_Recipe.helpers({
  /**
   * @returns {*} True if recipe username is same as logged in user's username
   */
  createdBy: function createdBy() {
    if (!Meteor.user()) {
      return false;
    }

    // Check that the current user is accessing a page in their area.
    const loggedInUser = Meteor.user().profile.name;
    const recipeCreator = Template.instance().data.recipe.username;
    return loggedInUser === recipeCreator;
  },
  /**
   * @returns {boolean} True if logged in, false if not.
   */
  loggedIn: function loggedIn() {
    if (Meteor.user()) {
      const recipeIdentity = Template.instance().data.recipe.identity;
      const username = Meteor.user().profile.name;
      const userDoc = Profiles.findDoc(username);
      const userFav = userDoc.favorites;
      if (_.contains(userFav, recipeIdentity)) {
        return false;
      }
      return true;
    }
    return false;
  },
  favorited: function favorited() {
    const recipeIdentity = Template.instance().data.recipe.identity;
    const username = Meteor.user().profile.name;
    const userDoc = Profiles.findDoc(username);
    const userFav = userDoc.favorites;
    if (_.contains(userFav, recipeIdentity)) {
      return true;
    }
    return false;
  },
  routeUserName() {
    return FlowRouter.getParam('username');
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
  'click .favorite-icon'(event) {
    event.preventDefault();
    console.log('favorite icon clicked');
    const username = Meteor.user().profile.name;
    const userDoc = Profiles.findDoc(username);
    console.log(userDoc);
    const userId = userDoc._id;
    const userFav = userDoc.favorites;
    const recipeIdentity = Template.instance().data.recipe.identity;
    userFav.push(recipeIdentity);
    console.log(userFav);
    userDoc.favorites = userFav;
    console.log(userDoc);
    Profiles.update(userId, { $set: userDoc });
  },
  'click .unfavorite-icon'(event) {
    event.preventDefault();
    console.log('unfavorite icon clicked');
    const username = Meteor.user().profile.name;
    const userDoc = Profiles.findDoc(username);
    const userId = userDoc._id;
    const userFav = userDoc.favorites;
    console.log(userFav);
    const recipeIdentity = Template.instance().data.recipe.identity;
    console.log(recipeIdentity);
    const userUnFav = _.without(userFav, recipeIdentity);
    console.log(userUnFav);
    userDoc.favorites = userUnFav;
    console.log(userDoc.favorites);
    console.log(userDoc);
    Profiles.update(userId, { $set: userDoc });
  },
});

