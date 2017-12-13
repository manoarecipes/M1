import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';

Template.Ingredient_Form_Control.onCreated(function onCreated() {
  this.subscribe(Ingredients.getPublicationName());
  this.tempRow = new ReactiveDict();
  this.tempRow.set('ingredientRows', []);
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
      const ingredientInput = this.tempRow.get('ingredientRows');
      ingredientInput.push(result);
      this.tempRow.set('ingredientRows', ingredientInput);
    },
    onNoResults: function () {
    },
  });
});

Template.Ingredient_Form_Control.helpers({
  addedIngredient() {
    return Template.instance().tempRow.get('ingredientRows');
  },

});

Template.Ingredient_Form_Control.events({
  'click .remove'(event, instance) {
    event.preventDefault();
    console.log(Template.currentData());
    console.log(event.target.abandon);
    console.log(event.target.amountRow);
    console.log(event.target);
    console.log(instance);
    console.log(this);
    console.log(Template.instance().tempRow.get('ingredientRows'));
  },
});
