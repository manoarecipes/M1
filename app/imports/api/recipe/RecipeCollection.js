import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection.js';
import { Tags } from '/imports/api/tag/TagCollection.js';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Recipe */

/**
 * Recipes provide content data for a user.
 * @extends module:Base~BaseCollection
 */
class RecipeCollection extends BaseCollection {

  /**
   * Creates the Recipe collection.
   */
  constructor() {
    super('Recipe', new SimpleSchema({
      username: { type: String },
      identity: { type: String },
      recipeName: { type: String },
      description: { type: String },
      instructions: { type: String },
      ingredients: { type: Array },
      'ingredients.$': { type: String },
      amounts: { type: Array },
      'amounts.$': { type: Array },
      'amounts.$.$': { type: String },
      // Remainder are optional
      tags: { type: Array, optional: true },
      'tags.$': { type: String },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Recipe.
   * @example
   * Recipes.define({ recipeName: 'BBQ Chicken',
   *                   description: 'Chicken with Glaze',
   *                   username: 'johnson',
   *                   instructions: '1.Cut chicken into cubes; 2.Make the sauce',
   *                   ingredients: ['Chicken', 'Vinegar', 'Bacon'],
   *                   tags: ['Foodgasm', 'BACON', 'Breakfast', 'Lunch'],
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more ingredients and/or tags are not defined.
   * @returns The newly created docID.
   */
  define({ recipeName, description, username, identity, instructions,
           ingredients, amounts, tags = [], picture = '' }) {
    // make sure required fields are OK.
    const checkPattern = {
      recipeName: String,
      description: String,
      username: String,
      identity: String,
      instructions: String,
      picture: String,
    };
    check({ recipeName, description, username, identity, instructions, picture }, checkPattern);

    // Adds ingredient to Ingredients if ingredient is not present in database
    _.each(ingredients, function (x) {
      if (!Ingredients.isDefined(x)) {
        Ingredients.define({ name: x, cost: '0.01' });
      }
    })

    // Adds ingredient to Ingredients if ingredient is not present in database
    _.each(tags, function (x) {
      if (!Tags.isDefined(x)) {
        Tags.define({ name: x });
      }
    })

    // Throw an error if there are duplicates in the passed ingredient names.
    if (ingredients.length !== _.uniq(ingredients).length) {
      throw new Meteor.Error(`${ingredients} contains duplicates`);
    }

    // Throw an error if there are duplicates in the passed tag names.
    if (tags.length !== _.uniq(tags).length) {
      throw new Meteor.Error(`${tags} contains duplicates`);
    }

    return this._collection.insert({
      identity,
      recipeName,
      description,
      username,
      instructions,
      ingredients,
      amounts,
      tags,
      picture,
    });
  }

  /**
   * Returns an object representing the Recipe docID in a format acceptable to define().
   * @param docID The docID of a Recipe.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const recipeName = doc.recipeName;
    const description = doc.description;
    const username = doc.username;
    const identity = doc.identity;
    const instructions = doc.instructions;
    const ingredients = doc.ingredients;
    const amounts = doc.amounts;
    const tags = doc.tags;
    const picture = doc.picture;
    return { recipeName, description, username, identity, instructions, ingredients, amounts, tags, picture };
  }

  /**
   * Throws an error if the passed name is not a defined Tag name.
   * @param name The name of an tag.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Tag names.
   * @param names An array of (hopefully) Tag names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns true if the passed entity is in this collection.
   * @param { String | Object } name The docID, or an object specifying a document, or the name, or the username.
   * @returns {boolean} True if name exists in this collection.
   */
  isDefined(name) {
    return (
        !!this._collection.findOne(name) ||
        !!this._collection.findOne({ name }) ||
        !!this._collection.findOne({ recipeName: name }) ||
        !!this._collection.findOne({ identity: name }));
  }

  /**
   * A stricter form of findOne, in that it throws an exception if the entity isn't found in the collection.
   * @param { String | Object } name Either the docID, or an object selector, or the 'name' field value, or the
   * username field value.
   * @returns { Object } The document associated with name.
   * @throws { Meteor.Error } If the document cannot be found.
   */
  findDoc(name) {
    const doc = (
        this._collection.findOne(name) ||
        this._collection.findOne({ name }) ||
        this._collection.findOne({ recipeName: name }) ||
        this._collection.findOne({ username: name }) ||
        this._collection.findOne({ identity: name }) ||
        this._collection.findOne({ _id: name }));
    if (!doc) {
      throw new Meteor.Error(`${name} is not a defined ${this._type}`);
    }
    return doc;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Recipes = new RecipeCollection();
