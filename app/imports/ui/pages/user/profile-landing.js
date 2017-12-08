import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Recipes } from '/imports/api/recipe/RecipeCollection';

Template.Profile_Landing.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Recipes.getPublicationName());
  this.context = Profiles.getSchema().namedContext('Profile_Page');
});

Template.Profile_Landing.helpers({
  routeUserName() {
    return FlowRouter.getParam('username');
  },
  profile() {
    const username = FlowRouter.getParam('username');
    return Profiles.findDoc(username);
  },
  /**
   * Searches through the favorite recipes of the user. If the recipe doesn't exist anymore, it is removed from
   * favorites. If it exists, it is displayed in a card.
   * @returns { Objects } The existing recipes referenced by the user's favorite list.
   */
  favRecipes() {
    const prof = Profiles.findDoc(FlowRouter.getParam('username'));
    const user = prof._id;
    return prof.favorites.map(function (x) {
      return Recipes.isDefined(x) ? Recipes.findDoc(x) : Profiles.update({ _id: user }, { $pull: { favorites: x } });
    });
  },
  myRecipes() {
    return Recipes.find({ username: FlowRouter.getParam('username') }).map(x => x);
  },
});
