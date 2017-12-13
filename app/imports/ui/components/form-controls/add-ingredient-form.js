import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';

Template.Add_Ingredient_Form.helpers({
  existingAmount() {
    return _.first(_.find(Template.instance().data.react.get('amountRows'), function (x) {
      return _.contains(_.values(x), Template.instance().data.value);
    }));
  },
});

Template.Add_Ingredient_Form.events({
  'submit .amount-row-field'(event) {
    event.preventDefault();
    const toRemove = Template.instance().data.value;
    const toResetAm = Template.instance().data.react.get('amountRows');
    const reactAm = Template.instance().data.react;
    reactAm.set('amountRows', _.reject(toResetAm, function (x) {
      return _.contains(_.values(x), toRemove);
    }));
  },
  'blur .amount-form'(event) {
    const toAdd = event.target.value;
    const reactAm = Template.instance().data.react;
    const toReset = reactAm.get('amountRows');
    const ingredient = Template.instance().data.value;
    const cleanAm = _.map(toReset, function (x) {
      let pair = x;
      if (_.contains(_.values(x), ingredient)) {
        pair = [toAdd, ingredient];
      }
      return pair;
    });
    reactAm.set('amountRows', cleanAm);
  },
});
