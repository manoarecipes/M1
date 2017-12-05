import { Template } from 'meteor/templating';
import { Recipes } from '/imports/api/recipe/RecipeCollection';

Template.Directory_Page.onCreated(function onCreated() {
  this.subscribe(Recipes.getPublicationName());
});
