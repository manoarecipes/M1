import { Template } from 'meteor/templating';
import { Recipes } from '/imports/api/recipe/RecipeCollection';

Template.Recipe_Directory_Page.onCreated(function onCreated() {
  this.subscribe(Recipes.getPublicationName());
});

Template.Recipe_Directory_Page.helpers({
  recipes() {
    return Recipes.findAll();
  },
});
