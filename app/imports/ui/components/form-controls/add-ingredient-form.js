import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';

Template.Add_Ingredient_Form.events({
  'submit .amount-row-field'(event) {
    event.preventDefault();
    const toRemove = Template.instance().data.value.name;
    const toResetIng = Template.instance().data.react.get('ingredientRows');
    const toResetAm = Template.instance().data.react.get('amountRows');
    const reactAm = Template.instance().data.react;
    reactAm.set('ingredientRows', _.reject(toResetIng, function (x) {
      return _.contains(_.values(x), toRemove);
    }));
    reactAm.set('amountRows', _.reject(toResetAm, function (x) {
      return _.contains(_.values(x), toRemove);
    }));
  },
  'blur .amount-row-field'(event) {
    const toAdd = event.target.value;
    const reactAm = Template.instance().data.react;
    const toReset = reactAm.get('amountRows');
    const ingredient = Template.instance().data.value.name;
    const cleanAm = _.reject(toReset, function (x) {
      return _.contains(_.values(x), ingredient);
    });
    cleanAm.push([toAdd, ingredient]);
    reactAm.set('amountRows', cleanAm);
  },
});
