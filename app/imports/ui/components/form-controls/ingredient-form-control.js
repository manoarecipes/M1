import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';

Template.Ingredient_Form_Control.onCreated(function onCreated() {
  this.subscribe(Ingredients.getPublicationName());
});

Template.Ingredient_Form_Control.onRendered(function onRendered() {
  this.$('.ui.search').search({
    source: Ingredients.findAll(),
    searchFields: [
      'name',
    ],
    searchFullText: false,
    searchOnFocus: false,
    selectFirstResult: true,
    searchDelay: 0,
    onSelect: (result) => {
      const amountInput = this.data.react.get('amountRows');
      amountInput.push(['', result.name]);
      this.data.react.set('amountRows', amountInput);
    },
    onNoResults: function () {
    },
  });
});

Template.Ingredient_Form_Control.helpers({
  addedIngredient() {
    console.log(Template.instance().data.react.get());
    console.log(Template.instance().data.react);
    const amount = Template.instance().data.react.get('amountRows');
    return _.map(amount, (option) => _.last(option));
  },
  sharedDict() {
    return Template.instance().data.react;
  },
});

