<template>
  <LoginForm />
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="sendForm">
      <label>Select a category</label>
      <BaseSelect
        :options="categories"
        v-model="event.category"
        label="Select a category"
      />
      <fieldset>
        <legend>Name & describe your event</legend>

        <BaseInput v-model="event.title" label="Title" type="text" />
        <BaseInput
          v-model="event.description"
          label="Description"
          type="text"
          error="This input has an error!"
        />
      </fieldset>

      <fieldset>
        <legend>Where is your event?</legend>
        <BaseInput v-model="event.location" label="Location" type="text" />
        <div>{{ event }}</div>
      </fieldset>

      <fieldset>
        <legend>Pets</legend>
        <p>Are pets allowed?</p>
        <div>
          <BaseRadioGroup
            v-model="event.pets"
            name="pets"
            :options="petOptions"
            vertical
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Extras</legend>
        <div>
          <BaseCheckbox v-model="event.extras.catering" label="Catering" />
        </div>

        <div>
          <BaseCheckbox v-model="event.extras.music" label="Live music" />
        </div>
      </fieldset>

      <BaseButton type="submit" class="-fill-gradient"> Submit </BaseButton>
    </form>
  </div>
</template>

<script>
import BaseCheckbox from "./BaseCheckbox.vue";
import axios from "axios";
import LoginForm from "./LoginForm.vue";

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
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: { LoginForm },
};
</script>

<style>
fieldset {
  border: 0;
  margin: 0;
}

legend {
  font-size: 27px;
  font-weight: 700;
  margin-top: 20px;
}
</style>
