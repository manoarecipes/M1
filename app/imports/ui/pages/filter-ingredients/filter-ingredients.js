import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Recipes } from '/imports/api/recipe/RecipeCollection';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';

const selectedIngredientsKey = 'selectedIngredients';

Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Ingredients.getPublicationName());
  this.subscribe(Recipes.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedIngredientsKey, undefined);
});

Template.Filter_Page.helpers({
  recipes() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedIngredientsKey)) {
      Template.instance().messageFlags.set(selectedIngredientsKey, _.map(Ingredients.findAll(),
          ingredients => ingredients.name));
    }
    // Find all profiles with the currently selected interests.
    const allRecipes = Recipes.findAll();
    const selectedIngredients = Template.instance().messageFlags.get(selectedIngredientsKey);
    return _.filter(allRecipes, recipe => _.intersection(recipe.ingredients, selectedIngredients).length > 0);
  },

  ingredients() {
    return _.map(Ingredients.findAll(),
        function makeIngredientsObject(ingredients) {
          return {
            label: ingredients.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedIngredientsKey), ingredients.name),
          };
        });
  },
});

Template.Filter_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Ingredients.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedIngredientsKey, _.map(selectedOptions, (option) => option.value));
  },
});

