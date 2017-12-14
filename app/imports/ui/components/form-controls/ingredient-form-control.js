import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';

Template.Ingredient_Form_Control.onCreated(function onCreated() {
  this.subscribe(Ingredients.getPublicationName());
});

Template.Ingredient_Form_Control.helpers({
  addedRow() {
    console.log(Template.instance().data.react.get());
    console.log(Template.instance().data.react);
    return Template.instance().data.react.get('amountRows');
  },
  sharedDict() {
    return Template.instance().data.react;
  },
});

Template.Ingredient_Form_Control.events({
  'click .newline'() {
    const amountInput = Template.instance().data.react.get('amountRows');
    amountInput.push(['', '']);
    Template.instance().data.react.set('amountRows', amountInput);
  },
});

