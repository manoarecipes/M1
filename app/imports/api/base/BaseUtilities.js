import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Ingredients.removeAll();
}
