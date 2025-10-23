<template>
  <v-container>
    <h1 class="mb-4">Todo List</h1>

    <div class="filters">
      <div class="radio">
        <input type="radio" name="type" value="all" checked /> Все
      </div>
      <div class="radio">
        <input type="radio" name="type" value="ongoing" /> Невыполненные
      </div>
      <div class="radio">
        <input type="radio" name="type" value="completed" /> Выполненные
      </div>
    </div>

    <v-card class="mb-4">
      <v-card-title>
        <v-icon v-if="true" icon="mdi-check-circle-outline" />
        <v-icon v-else icon="mdi-checkbox-blank-circle-outline" />
        Текст TODO
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary">Выполнить</v-btn>
        <v-btn color="error">Удалить</v-btn>
      </v-card-actions>
    </v-card>

    <div class="d-flex ga-2">
      <v-btn
        flat
        color="primary"
        prepend-icon="mdi-plus"
        @click="dialog = true"
      >
        Добавить TODO
      </v-btn>
      <v-btn variant="outlined" prepend-icon="mdi-delete-outline" color="error"
        >Очистить список</v-btn
      >
    </div>

    <v-checkbox label="Возвращать ошибки в запросах" v-model="serverError" />

    <v-dialog v-model="dialog" max-width="600">
      <v-card
        prepend-icon="mdi-checkbox-marked-circle-plus-outline"
        title="Добавление TODO"
      >
        <v-card-text>
          <v-text-field label="Текст" hide-details></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Отмена" variant="plain" @click="dialog = false"></v-btn>

          <v-btn color="primary" text="Добавить" variant="tonal"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar">
      Операция прошла успешно

      <template v-slot:actions>
        <v-btn color="pink" variant="text"> ОК </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="error">
      Какая-то ошибка

      <template v-slot:actions>
        <v-btn color="pink" variant="text"> ОК </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoComponent",
  data: () => ({
    dialog: false,
    snackbar: false,
    error: false,
    serverError: false,
  }),
  watch: {
    serverError: {
      handler(value: boolean) {
        window.serverError = value;
      },
      immediate: true,
    },
  },
});
</script>

<style lang="scss">
.filters {
  display: flex;
  gap: 8px;
  margin: 0 0 16px;
}
</style>
