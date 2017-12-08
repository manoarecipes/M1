import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Recipes } from '/imports/api/recipe/RecipeCollection';

Template.Delete_Recipe_Page.onCreated(function onCreated() {
  this.subscribe(Recipes.getPublicationName());
  this.context = Recipes.getSchema().namedContext('Delete_Recipe_Page');
});

Template.Delete_Recipe_Page.events({
  'click .delete'(event) {
    event.preventDefault();
    const username = FlowRouter.getParam('username');
    const recipeNum = FlowRouter.getParam('recipeNum');
    const docID = Recipes.findDoc(recipeNum)._id;
    Recipes.removeIt(docID);
    FlowRouter.go(`/${username}/profile`);
  },
  'click .return'(event) {
    event.preventDefault();
    const username = FlowRouter.getParam('username');
    FlowRouter.go(`/${username}/profile`);
  },

});
