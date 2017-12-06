import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';


/*                        LANDING ROUTE                       */

export const landingPageRouteName = 'MR_Landing_Page';
FlowRouter.route('/', {
  name: landingPageRouteName,
  action() {
    BlazeLayout.render('Landing_Layout', { main: landingPageRouteName });
  },
});

/*                        DIRECTORY ROUTE                       */

function addDirectoryBodyClass() {
  $('body').addClass('directory-page-body');
}

function removeDirectoryBodyClass() {
  $('body').removeClass('directory-page-body');
}

export const directoryPageRouteName = 'Directory_Page';
FlowRouter.route('/directory', {
  name: directoryPageRouteName,
  action() {
    BlazeLayout.render('Directory_Layout', { main: directoryPageRouteName });
  },
  triggersEnter: [addDirectoryBodyClass],
  triggersExit: [removeDirectoryBodyClass],
});


/*                        USER ROUTES                      */


function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/edit-profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

export const adminPageRouteName = 'Admin_Page';
userRoutes.route('/admin', {
  name: adminPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: adminPageRouteName });
  },
});

export const profileLandingRouteName = 'Profile_Landing';
userRoutes.route('/profile', {
  name: profileLandingRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profileLandingRouteName });
  },
});

export const filterPageRouteName = 'Filter_Page';
userRoutes.route('/filter', {
  name: filterPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: filterPageRouteName });
  },
});
export const filterIngredientsPageRouteName = 'Filter_Ingredients_Page';
userRoutes.route('/filter-ingredients', {
  name: filterIngredientsPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: filterIngredientsPageRouteName });
  },
});

export const recipeDirectoryPageRouteName = 'Recipe_Directory_Page';
userRoutes.route('/recipe-directory', {
  name: recipeDirectoryPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: recipeDirectoryPageRouteName });
  },
});

export const recipePageRouteName = 'Add_Recipe_Page';
userRoutes.route('/add-recipe', {
  name: recipePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: recipePageRouteName });
  },
});

/*                        MISC ROUTES                       */
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Page_Not_Found');
  },
};
