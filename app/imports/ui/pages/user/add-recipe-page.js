import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';
import { Recipes } from '/imports/api/recipe/RecipeCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Add_Recipe_Page.onCreated(function onCreated() {
  this.subscribe(Ingredients.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Recipes.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Recipes.getSchema().namedContext('Add_Recipe_Page');
});

Template.Add_Recipe_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  recipe() {
    return Recipes.findDoc(FlowRouter.getParam('recipeName'));
  },
  ingredients() {
    const recipe = Recipes.findDoc(FlowRouter.getParam('recipeName'));
    const selectedIngredients = recipe.ingredients;
    return recipe && _.map(Ingredients.findAll(),
        function makeIngredientObject(ingredient) {
          return { label: ingredient.name, selected: _.contains(selectedIngredients, ingredient.name) };
        });
  },
});


Template.Add_Recipe_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const recipeName = event.target.name.value;
    const description = event.target.Description.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const instructions = event.target.Instructions.value;
    const picture = event.target.Picture.value;
    const selectedFoodTags = _.filter(event.target.Tags.selectedOptions, (option) => option.selected);
    const foodTags = _.map(selectedFoodTags, (option) => option.value);
    const selectedIngredients = _.filter(event.target.Ingredients.selectedOptions, (option) => option.selected);
    const ingredients = _.map(selectedIngredients, (option) => option.value);

    const updatedRecipeData = { recipeName, description, username, instructions, picture, foodTags, ingredients };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Recipes.getSchema().clean(updatedRecipeData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = Recipes.findDoc(FlowRouter.getParam('recipeName'))._id;
      const id = Recipes.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
