import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Recipes } from '/imports/api/recipe/RecipeCollection';
import { Ingredients } from '/imports/api/ingredients/IngredientsCollection';
import { Tags } from '/imports/api/tag/TagCollection';

Profiles.publish();
Ingredients.publish();
Tags.publish();
Recipes.publish();
