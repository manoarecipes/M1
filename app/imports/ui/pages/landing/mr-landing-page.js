import { Template } from 'meteor/templating';
import { Recipes } from '/imports/api/recipe/RecipeCollection';

Template.MR_Landing_Page.onCreated(function onCreated() {
  this.subscribe(Recipes.getPublicationName());
});

Template.MR_Landing_Page.helpers({

  /**
   * Returns a cursor to recipes, sorted by recipe name.
   */
  recipes() {
    return Recipes.find({}, { sort: { recipeName: 1 } });
  },
});
