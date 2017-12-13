import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';

Template.Ingredient_Form_Control.onCreated(function onCreated() {
  this.subscribe(Ingredients.getPublicationName());
});

Template.Ingredient_Form_Control.onRendered(function onRendered() {
  const content = Ingredients.findAll();
  console.log(content);
  this.$('.ui.search').search({
    source: content,
    searchFields: [
      'name',
    ],
    searchFullText: false,
    onSelect: (result) => {
      const ingredientInput = this.data.react.get('ingredientRows');
      const amountInput = this.data.react.get('amountRows');
      ingredientInput.push(result);
      amountInput.push(['', result.name]);
      this.data.react.set('ingredientRows', ingredientInput);
      this.data.react.set('amountRows', amountInput);
    },
    onNoResults: function () {
    },
  });
});

Template.Ingredient_Form_Control.helpers({
  addedIngredient() {
    console.log(Template.instance().data.react.get('ingredientRows'));
    console.log(Template.instance().data.react.get());
    console.log(Template.instance().data.react);
    return Template.instance().data.react.get('ingredientRows');
  },
  sharedDict() {
    return Template.instance().data.react;
  },
});

Template.Ingredient_Form_Control.events({
  'submit .profile-data-form'() {
    console.log('ingredient form control happens here!');
  },
});
