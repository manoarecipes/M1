import { Template } from 'meteor/templating';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';
import { _ } from 'meteor/underscore';

Template.Ingredient_Form_Control.onRendered(function onRendered() {
  this.subscribe(Ingredients.getPublicationName());
  this.$('.ui.search').search({
    source: Ingredients.findAll(),
    searchFields: [
      'name',
    ],
    searchFullText: false,
  });
});
