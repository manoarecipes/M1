import { Template } from 'meteor/templating';

export const BudgetObjects = [{ label: 'Daily: $10', value: 'D10' },
                           { label: 'Daily: $20', value: 'D20' },
                           { label: 'Weekly: $50', value: 'W50' },
                           { label: 'Weekly: $75', value: 'W75' },
                           { label: 'Weekly: $100', value: 'W100' }];
/** BudgetObjects = GPAObjects */

Template.Budget_Page.helpers({
  /** Budget_Page = Create_Student_Data_Page */
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  Budgets() {
    return BudgetObjects;
  },
  /** Budgets = GPAs
   * BudgetObjects = GPAObjects
   */
});
