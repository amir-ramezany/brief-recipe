import { createStore } from "vuex";

export default createStore({
  state: {
    recipes: [
      {
        id: 1,
        slug: "katsu-curry",
        title: "katsu-curry",
        description:
          "A delicious curry made with chicken, potatoes, and a special sauce",
        ingredients: [
          "1 tablespoon olive oil",
          "1 onion, chopped",
          "2 cloves garlic, chopped",
          "1 tablespoon curry powder",
        ],
        method: [
          "Heat oil in a large skillet over medium heat.",
          "Add onion and garlic and cook, stirring often, until softened, about 5 minutes.",
          "Add curry powder and cook, stirring, until fragrant, about 1 minute.",
          "Add chicken and potatoes and cook, stirring, until heated through, about 5 minutes.",
        ],
      },
      {
        id: 2,
        slug: "ramen-noodle-soup",
        title: "Ramen noodle soup",
        description:
          "A delicious curry made with chicken, potatoes, and a special sauce",
        ingredients: [
          "1 tablespoon olive oil",
          "1 onion, chopped",
          "2 cloves garlic, chopped",
          "1 tablespoon curry powder",
        ],
        method: [
          "Heat oil in a large skillet over medium heat.",
          "Add onion and garlic and cook, stirring often, until softened, about 5 minutes.",
          "Add curry powder and cook, stirring, until fragrant, about 1 minute.",
          "Add chicken and potatoes and cook, stirring, until heated through, about 5 minutes.",
        ],
      },
    ],
  },
  mutations: {
    Add_Recipe(state, recipe) {
      state.recipes.push(recipe);
    },
  },
});
