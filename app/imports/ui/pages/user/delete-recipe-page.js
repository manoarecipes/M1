import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';
import { Recipes } from '/imports/api/recipe/RecipeCollection';
import { Tags } from '/imports/api/tag/TagCollection';

const recipeNum = FlowRouter.getParam('recipeNum');
const username = FlowRouter.getParam('username');



Template.Edit_Recipe_Page.events({
  'click .delete'(event) {
    event.preventDefault();
    const docID = Recipes.findDoc(recipeNum)._id;
    Recipes.removeIt(docID);
    FlowRouter.go(`/${username}/profile`);
  },
  'click .return'(event) {
    event.preventDefault();
    FlowRouter.go(`/${username}/edit/${recipeNum}`);
  },

});
