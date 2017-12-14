import { Template } from 'meteor/templating';
import { Recipes } from '/imports/api/recipe/RecipeCollection';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.View_Recipe_Page.onCreated(function onCreated() {
  this.subscribe(Recipes.getPublicationName());
});

Template.View_Recipe_Page.helpers({
  recipe() {
    const recipeNum = FlowRouter.getParam('recipeNum');
    return Recipes.findDoc(recipeNum);
  },
});

