<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="sendForm">
      <label>Select a category</label>
      <BaseSelect
        :options="categories"
        v-model="event.category"
        label="Select a category"
      />

      <h3>Name & describe your event</h3>

      <BaseInput v-model="event.title" label="Title" type="text" />
      <BaseInput v-model="event.description" label="Description" type="text" />

      <h3>Where is your event?</h3>

      <BaseInput v-model="event.location" label="Location" type="text" />
      <div>{{ event }}</div>
      <h3>Are pets allowed?</h3>

      <BaseRadioGroup
        v-model="event.pets"
        name="pets"
        :options="petOptions"
        vertical
      />

      <h3>Extras</h3>
      <div>
        <BaseCheckbox v-model="event.extras.catering" label="Catering" />
      </div>

      <div>
        <BaseCheckbox v-model="event.extras.music" label="Live music" />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import BaseCheckbox from "./BaseCheckbox.vue";
import axios from "axios";
export default {
  data() {
    return {
      categories: [
        "sustainability",
        "nature",
        "animal welfare",
        "housing",
        "education",
        "food",
        "community",
      ],
      event: {
        category: "",
        title: "",
        description: "",
        location: "",
        pets: 1,
        extras: {
          catering: false,
          music: false,
        },
      },
      petOptions: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    };
  },
  methods: {
    async sendForm() {
      try {
        const res = await axios
          .post(
            "https://my-json-server.typicode.com/jontatan25/Vue-forms/events",
            this.event
          )
          .then((response) => {
            console.log(response);
          });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
