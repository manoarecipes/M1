import { Template } from 'meteor/templating';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';

Template.Add_Ingredient_Form.onRendered(function onRendered() {
  console.log(this.data.value.name);
  console.log(this);
  console.log();
  console.log(Template.parentData(2));
});
