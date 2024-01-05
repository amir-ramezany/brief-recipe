<template>
  <div class="home">
    <h1>my recipe</h1>
    <button style="margin-bottom: 1rem" @click="togglePopUp">
      Add New Recipes
    </button>

    <div class="recipes">
      <div
        class="card"
        v-for="recipe in $store.state.recipes"
        :key="recipe.slug"
      >
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <router-link :to="`/recipe/${recipe.slug}`">
          <button>View Recipe</button>
        </router-link>
        <br />
        <br />
        <div>
          <button @click="removeRecipe(recipe.id)">X</button>
        </div>
      </div>
    </div>

    <div class="add-recipe-popup" v-if="popUpOpen">
      <div class="popup-content">
        <h2>Add New Recipe</h2>
        <form @submit.prevent="addNewRecipe">
          <div class="group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="newRecipe.title" />
          </div>
          <div class="group">
            <label for="desc">Description</label>
            <textarea id="desc" v-model="newRecipe.description"></textarea>
          </div>
          <div class="group">
            <label for="ingre">Ingredients</label>
            <div
              class="ingredient"
              v-for="i in newRecipe.ingredientRows"
              :key="i"
            >
              <input
                id="ingre"
                type="text"
                v-model="newRecipe.ingredients[i - 1]"
              />
            </div>

            <button type="button" @click="addIngredient">Add Ingredient</button>
          </div>
          <div class="group">
            <label for="method">Method</label>
            <div class="Method" v-for="i in newRecipe.methodRows" :key="i">
              <textarea
                id="method"
                v-model="newRecipe.method[i - 1]"
              ></textarea>
            </div>
            <button type="button" @click="addMethode">Add Step</button>
          </div>
          <button type="submit">Add Recipe</button>
          <button type="button" @click="togglePopUp">Close</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "HomeView",
  setup() {
    const newRecipe = ref({
      id: generateUniqueNumber(),
      title: "",
      description: "",
      ingredients: [],
      method: [],
      ingredientRows: 1,
      methodRows: 1,
    });

    function generateUniqueNumber() {
      if (typeof generateUniqueNumber.counter === "undefined") {
        generateUniqueNumber.counter = 2;
      }

      return generateUniqueNumber.counter++;
    }

    const store = useStore();

    const popUpOpen = ref(false);
    const togglePopUp = () => {
      popUpOpen.value = !popUpOpen.value;
    };
    const addIngredient = () => {
      newRecipe.value.ingredientRows++;
    };
    const addMethode = () => {
      newRecipe.value.methodRows++;
    };
    const addNewRecipe = () => {
      newRecipe.value.slug = newRecipe.value.title
        .toLowerCase()
        .replace(/\s/g, "-"); //replace every space with - in url

      if (!newRecipe.value.slug) {
        alert("please enter a title ");
        return;
      }
      store.commit("Add_Recipe", { ...newRecipe.value });
      newRecipe.value = {
        id: generateUniqueNumber(),
        title: "",
        description: "",
        ingredients: [],
        method: [],
        ingredientRows: 1,
        methodRows: 1,
      };
      togglePopUp();
      close.value = !close.value;
    };

    const removeRecipe = (id) => {
      return (store.state.recipes = store.state.recipes.filter(
        (item) => item.id !== id
      ));
    };

    return {
      popUpOpen,
      togglePopUp,
      newRecipe,
      addIngredient,
      addMethode,
      addNewRecipe,
      store,
      removeRecipe,
    };
  },
};
</script>
<style>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 32px;
}

.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.recipes .card {
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #081c33;
}

.recipes .card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.recipes .card p {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.add-recipe-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-recipe-popup .popup-content {
  background-color: #081c33;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 768px;
}

.popup-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.popup-content .group {
  margin-bottom: 1rem;
}

.popup-content .group label {
  display: block;
  margin-bottom: 0.5rem;
}

.popup-content .group input,
.popup-content .group textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.popup-content .group textarea {
  height: 100px;
  resize: none;
}

.popup-content button[type="submit"] {
  margin-right: 1rem;
}
.close-card {
  margin-top: 2rem;
}
</style>
