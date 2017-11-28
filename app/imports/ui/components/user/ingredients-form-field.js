import { Template } from 'meteor/templating';

Template.Ingredients_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

