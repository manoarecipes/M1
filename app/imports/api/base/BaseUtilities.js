import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Ingrediant } from '/imports/api/ingrediant/IngrediantCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Ingrediant.removeAll();
}
