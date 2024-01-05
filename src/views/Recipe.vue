<template>
  <div class="recipe">
    <router-link to="/"
      ><span style="font-size: 1.4rem">&lt;Back</span></router-link
    >
    <br />
    <br />
    <h1>{{ recipe.title }}</h1>
    <p class="desc">{{ recipe.description }}</p>
    <hr />
    <div class="ingredients">
      <h3>Ingredients</h3>
      <ul>
        <li v-for="ingredient in recipe.ingredients" :key="ingredient">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="method">
      <h3>Method</h3>
      <ul>
        <li v-for="method in recipe.method" :key="method">
          {{ method }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const recipe = computed(() => {
      return store.state.recipes.find(
        (recipe) => recipe.slug === route.params.slug
      );
    });

    return {
      store,
      recipe,
      route,
    };
  },
};
</script>

<style>
.recipe {
  padding: 1rem;
  max-width: 768px;
  margin: 0 auto;
}

.desc {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

hr {
  margin-bottom: 1rem;
}

h3 {
  margin-bottom: 1rem;
}

.ingredients {
  padding: 1rem;
  background-color: #081c33;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.ingredients ul li {
  list-style-position: inside;
  list-style-type: disc;
  line-height: 1.4;
  margin-bottom: 1rem;
  margin-left: 1rem;
}

.method ul li {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  list-style-position: inside;
  border-bottom: 1px solid #eee;
}
</style>
