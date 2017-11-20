import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Ingredients.removeAll();
}
