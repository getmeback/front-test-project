<template>
  <v-app>
    <v-main>
      <!-- Основной экран тестового задания -->
      <TodoComponent />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TodoComponent from "./pages/Todo.vue";

export default defineComponent({
  name: "App",
  components: {
    TodoComponent,
  },
});
</script>

<style lang="scss"></style>
