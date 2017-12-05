import { Template } from 'meteor/templating';
import { Recipes } from '/imports/api/recipe/RecipeCollection';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Profile_Recipe.onCreated(function onCreated() {
  this.subscribe(Recipes.getPublicationName());
});

Template.Profile_Recipe.helpers({

});
