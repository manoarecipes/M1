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

Template.Edit_Recipe_Page.onCreated(function onCreated() {
  this.subscribe(Ingredients.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Recipes.getPublicationName());
  this.subscribe(Tags.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.tempRow = new ReactiveDict();
  this.tempRow.set('amountRows', []);
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Recipes.getSchema().namedContext('Edit_Recipe_Page');
});

Template.Edit_Recipe_Page.helpers({
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
    const recipeNum = FlowRouter.getParam('recipeNum');
    return Recipes.findDoc(recipeNum);
  },
  tags() {
    const recipeNum = FlowRouter.getParam('recipeNum');
    const recipe = Recipes.findDoc(recipeNum);
    const selectedTags = recipe.tags;
    return recipe && _.map(Tags.findAll(),
        function makeTagsObject(tags) {
          return { label: tags.name, selected: _.contains(selectedTags, tags.name) };
        });
  },
  sharedReact() {
    const recipeNum = FlowRouter.getParam('recipeNum');
    const recipe = Recipes.findDoc(recipeNum);
    const amounts = recipe.amounts;
    Template.instance().tempRow.set('amountRows', amounts);
    console.log(Template.instance().tempRow.get('amountRows'));
    return Template.instance().tempRow;
  },
});

Template.Edit_Recipe_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const recipeName = event.target.name.value;
    const description = event.target.Description.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const identity = FlowRouter.getParam('recipeNum');
    const instructions = event.target.Instructions.value;
    const picture = event.target.Picture.value;
    const amounts = instance.tempRow.get('amountRows');
    const ingredients = _.map(amounts, (option) => _.last(option));
    const selectedTags = _.filter(event.target.Tags.selectedOptions, (option) => option.selected);
    const tags = _.map(selectedTags, (option) => option.value);


    const updatedRecipeData = { recipeName, description, username, identity, instructions, picture, amounts, ingredients, tags };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Recipes.getSchema().clean(updatedRecipeData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const recipeNum = FlowRouter.getParam('recipeNum');
      const docID = Recipes.findDoc(recipeNum)._id;
      const id = Recipes.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
  'click .return'(event) {
    event.preventDefault();
    const username = FlowRouter.getParam('username');
    FlowRouter.go(`/${username}/profile`);
  },
});
