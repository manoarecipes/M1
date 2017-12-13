import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';
import { Recipes } from '/imports/api/recipe/RecipeCollection';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class ProfileCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Profile', new SimpleSchema({
      username: { type: String },
      // Remainder are optional
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      title: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      favorites: { type: Array, optional: true },
      'favorites.$': { type: String },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ firstName = '', lastName = '', username, picture = '', title = '', favorites = [] }) {
    // make sure required fields are OK.
    const checkPattern = {
      firstName: String, lastName: String, username: String, picture: String, title: String,
    };
    check({ firstName, lastName, username, picture, title }, checkPattern);

    // Throw an error if any of the passed recipe names are not defined.
    Recipes.assertNames(favorites);

    // Throw an error if there are duplicates in the passed recipe names.
    if (favorites.length !== _.uniq(favorites).length) {
      throw new Meteor.Error(`${favorites} contains duplicates`);
    }

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    return this._collection.insert({ firstName, lastName, username, picture, title, favorites });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const username = doc.username;
    const picture = doc.picture;
    const title = doc.title;
    const favorites = doc.favorites;
    return { firstName, lastName, username, picture, title, favorites };
  }

  /**
   * A stricter form of findOne, in that it throws an exception if the entity isn't found in the collection.
   * @param { String | Object } name Either the docID, or an object selector, or the 'name' field value, or the
   * username field value.
   * @returns { Object } The document associated with name.
   * @throws { Meteor.Error } If the document cannot be found.
   */
  findDoc(name) {
    const doc = this._collection.findOne({ username: name });
    if (!doc) {
      throw new Meteor.Error(`${name} is not a defined ${this._type}`);
    }
    return doc;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();
