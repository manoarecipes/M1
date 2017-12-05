import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';
import { Recipes } from '/imports/api/recipe/RecipeCollection';
import { Tags } from '/imports/api/tag/TagCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const recipeNum = new Date().valueOf().toString();

Template.Add_Recipe_Page.onCreated(function onCreated() {
  this.subscribe(Ingredients.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Recipes.getPublicationName());
  this.subscribe(Tags.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Recipes.getSchema().namedContext('Add_Recipe_Page');
  Recipes.define({
    username: FlowRouter.getParam('username'),
    identity: recipeNum,
  });
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
  recipe() {
    return Recipes.findDoc(recipeNum);
  },
  ingredients() {
    const recipe = Recipes.findDoc(recipeNum);
    const selectedIngredients = recipe.ingredients;
    return recipe && _.map(Ingredients.findAll(),
        function makeIngredientObject(ingredient) {
          return { label: ingredient.name, selected: _.contains(selectedIngredients, ingredient.name) };
        });
  },
  tags() {
    const recipe = Recipes.findDoc(recipeNum);
    const selectedTags = recipe.tags;
    return recipe && _.map(Tags.findAll(),
        function makeTagsObject(tags) {
          return { label: tags.name, selected: _.contains(selectedTags, tags.name) };
        });
  },
});

Template.Add_Recipe_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const recipeName = event.target.name.value;
    const description = event.target.Description.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const identity = recipeNum;
    const instructions = event.target.Instructions.value;
    const picture = event.target.Picture.value;
    const selectedIngredients = _.filter(event.target.Ingredients.selectedOptions, (option) => option.selected);
    const ingredients = _.map(selectedIngredients, (option) => option.value);
    const selectedTags = _.filter(event.target.Tags.selectedOptions, (option) => option.selected);
    const tags = _.map(selectedTags, (option) => option.value);

    const updatedRecipeData = { recipeName, description, username, identity, instructions, picture, ingredients, tags };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Recipes.getSchema().clean(updatedRecipeData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = Recipes.findDoc(recipeNum)._id;
      const id = Recipes.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
  'click .delete'(event) {
    event.preventDefault();
    const docID = Recipes.findDoc(recipeNum)._id;
    Recipes.removeIt(docID);
    const username = FlowRouter.getParam('username');
    FlowRouter.go(`/${username}/profile`);
  },
});
