import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';

/*                        OPEN ACCESS ROUTES               */

function addOpenBodyClass() {
  $('body').addClass('open-access-body');
}

function removeOpenBodyClass() {
  $('body').removeClass('open-access-body');
}

const openAccessRoutes = FlowRouter.group({
  name: 'openAccessRoutes',
  triggersEnter: [addOpenBodyClass],
  triggersExit: [removeOpenBodyClass],
});

export const landingPageRouteName = 'MR_Landing_Page';
openAccessRoutes.route('/', {
  name: landingPageRouteName,
  action() {
    BlazeLayout.render('Open_Access_Layout', { main: landingPageRouteName });
  },
});

export const filterPageRouteName = 'Filter_Page';
openAccessRoutes.route('/filter', {
  name: filterPageRouteName,
  action() {
    BlazeLayout.render('Open_Access_Layout', { main: filterPageRouteName });
  },
});

export const filterIngredientsPageRouteName = 'Filter_Ingredients_Page';
openAccessRoutes.route('/filter-ingredients', {
  name: filterIngredientsPageRouteName,
  action() {
    BlazeLayout.render('Open_Access_Layout', { main: filterIngredientsPageRouteName });
  },
});

export const recipeDirectoryPageRouteName = 'Recipe_Directory_Page';
openAccessRoutes.route('/recipe-directory', {
  name: recipeDirectoryPageRouteName,
  action() {
    BlazeLayout.render('Open_Access_Layout', { main: recipeDirectoryPageRouteName });
  },
});

export const weeklyAdPageRouteName = 'Weekly_Ad_Page';
openAccessRoutes.route('/weekly-ad', {
  name: weeklyAdPageRouteName,
  action: function () {
    BlazeLayout.render('Open_Access_Layout', { main: weeklyAdPageRouteName });
  },
});

export const viewRecipePageRouteName = 'View_Recipe_Page';
openAccessRoutes.route('/view/:recipeNum', {
  name: viewRecipePageRouteName,
  action() {
    BlazeLayout.render('Open_Access_Layout', { main: viewRecipePageRouteName });
  },
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

export const landingPageUserRouteName = 'MR_Landing_Page';
userRoutes.route('/', {
  name: landingPageUserRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: landingPageUserRouteName });
  },
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

export const weeklyAdPageUserRouteName = 'Weekly_Ad_Page';
userRoutes.route('/weekly-ad', {
  name: weeklyAdPageUserRouteName,
  action: function () {
    BlazeLayout.render('User_Layout', { main: weeklyAdPageUserRouteName });
  },
});

export const profileLandingRouteName = 'Profile_Landing';
userRoutes.route('/profile', {
  name: profileLandingRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profileLandingRouteName });
  },
});

export const recipePageRouteName = 'Add_Recipe_Page';
userRoutes.route('/add-recipe', {
  name: recipePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: recipePageRouteName });
  },
});

export const filterPageUserRouteName = 'Filter_Page';
openAccessRoutes.route('/filter', {
  name: filterPageUserRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: filterPageUserRouteName });
  },
});

export const filterIngredientsPageUserRouteName = 'Filter_Ingredients_Page';
userRoutes.route('/filter-ingredients', {
  name: filterIngredientsPageUserRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: filterIngredientsPageUserRouteName });
  },
});

export const recipeDirectoryPageUserRouteName = 'Recipe_Directory_Page';
userRoutes.route('/recipe-directory', {
  name: recipeDirectoryPageUserRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: recipeDirectoryPageUserRouteName });
  },
});

export const editRecipePageRouteName = 'Edit_Recipe_Page';
userRoutes.route('/edit/:recipeNum', {
  name: editRecipePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: editRecipePageRouteName });
  },
});

export const deleteRecipePageRouteName = 'Delete_Recipe_Page';
userRoutes.route('/delete/:recipeNum', {
  name: deleteRecipePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: deleteRecipePageRouteName });
  },
});


/*                        MISC ROUTES                       */
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Page_Not_Found');
  },
};
