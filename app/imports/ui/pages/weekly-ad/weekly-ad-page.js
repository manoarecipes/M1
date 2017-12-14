import { Template } from 'meteor/templating';

Template.Weekly_Ad_Page.helpers({
  adSource() {
    return 'https://www.foodland.com/files/weekly-ads/MSW-112917-Oahu-Pages.pdf';
  },
});