import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Recipes } from '/imports/api/recipe/RecipeCollection';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';


Interests.publish();
Profiles.publish();
Ingredients.publish();
Recipes.publish();
