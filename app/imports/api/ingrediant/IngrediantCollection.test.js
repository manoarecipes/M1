import { Ingrediant } from '/imports/api/ingrediant/IngrediantCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('IngrediantCollection', function testSuite() {
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
      let docID = Ingrediant.define(defineObject);
      expect(Ingrediant.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Ingrediant.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.cost).to.equal(cost);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Ingrediant.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Interest.
      const dumpObject = Ingrediant.dumpOne(docID);
      Ingrediant.removeIt(docID);
      expect(Ingrediant.isDefined(docID)).to.be.false;
      docID = Ingrediant.restoreOne(dumpObject);
      expect(Ingrediant.isDefined(docID)).to.be.true;
      Ingrediant.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Ingrediant.define(defineObject);
      expect(Ingrediant.isDefined(docID)).to.be.true;
      const docID2 = Ingrediant.findID(name);
      expect(docID).to.equal(docID2);
      Ingrediant.findIDs([name, name]);
      Ingrediant.removeIt(docID);
    });
  });
}

