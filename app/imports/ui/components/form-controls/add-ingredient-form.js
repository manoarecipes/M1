import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';

Template.Add_Ingredient_Form.helpers({
  existingAmount() {
    return _.first(Template.instance().data.values);
  },
  existingIngredient() {
    return _.last(Template.instance().data.values);
  },
});

Template.Add_Ingredient_Form.events({
  'submit .amount-row-field'(event) {
    event.preventDefault();
    const toRemove = _.last(Template.instance().data.values);
    console.log(toRemove);
    const toResetAm = Template.instance().data.react.get('amountRows');
    const reactAm = Template.instance().data.react;
    reactAm.set('amountRows', _.reject(toResetAm, function (x) {
      return _.contains(_.values(x), toRemove);
    }));
  },
  'blur .amount-row-field'(event) {
    if (event.target.name === 'amount') {
      const toAdd = event.target.value;
      const react = Template.instance().data.react;
      const amRows = react.get('amountRows');
      const ingredient = _.last(Template.instance().data.values);
      console.log('amount');
      console.log(event.target);
      console.log(toAdd);
      console.log(react);
      console.log(ingredient);
      let blankCount = 0;
      const isBlank = _.isEmpty(ingredient);
      console.log(isBlank);
      const cleanAm = _.map(amRows, function (x) {
        console.log(x);
        let pair = x;
        console.log('initial');
        console.log(pair);
        if (_.contains(x, ingredient)) {
          if (isBlank && !blankCount) {
            pair = [toAdd, ingredient];
            console.log('adjusted');
            console.log(pair);
            blankCount++;
          }
        }
        return pair;
      });
      console.log(cleanAm);
      react.set('amountRows', cleanAm);
    } else {
      const toAdd = event.target.value;
      const react = Template.instance().data.react;
      const amRows = react.get('amountRows');
      const amount = _.first(Template.instance().data.values);
      console.log('ingredient');
      console.log(event.target);
      console.log(toAdd);
      console.log(react);
      console.log(amount);
      const oriIng = _.last(Template.instance().data.values);
      console.log(oriIng);
      const cleanAm = _.map(amRows, function (x) {
        let pair = x;
        console.log(_.contains(x, amount));
        console.log(_.contains(x, oriIng));
        if (_.contains(x, amount) && _.contains(x, oriIng)) {
          pair = [amount, toAdd];
        }
        return pair;
      });
      console.log(cleanAm);
      react.set('amountRows', cleanAm);
    }
  },
});
