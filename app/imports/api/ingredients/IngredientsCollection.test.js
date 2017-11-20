import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('IngredientsCollection', function testSuite() {
    const name = 'Rice';
    const cost = '0.01';
    const defineObject = { name, cost };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Ingredients.define(defineObject);
      expect(Ingredients.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Ingredients.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.cost).to.equal(cost);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Ingredients.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Interest.
      const dumpObject = Ingredients.dumpOne(docID);
      Ingredients.removeIt(docID);
      expect(Ingredients.isDefined(docID)).to.be.false;
      docID = Ingredients.restoreOne(dumpObject);
      expect(Ingredients.isDefined(docID)).to.be.true;
      Ingredients.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Ingredients.define(defineObject);
      expect(Ingredients.isDefined(docID)).to.be.true;
      const docID2 = Ingredients.findID(name);
      expect(docID).to.equal(docID2);
      Ingredients.findIDs([name, name]);
      Ingredients.removeIt(docID);
    });
  });
}

