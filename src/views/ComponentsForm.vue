<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit="submit">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="category"
        :error="errors.category"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="title"
        :error="errors.title"
        type="text"
      />

      <BaseInput
        label="Description"
        v-model="description"
        :error="errors.description"
        type="text"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="location"
        :error="errors.location"
        type="text"
      />

      <h3>Are pets allowed?</h3>
      <BaseRadioGroup
        v-model="pets"
        :error="errors.pets"
        name="pets"
        :options="[
          { value: 1, label: 'Yes' },
          { value: 0, label: 'No' },
        ]"
      />

      <h3>Extras</h3>
      <div>
        <BaseCheckbox
          label="Catering"
          v-model="catering"
          :error="errors.catering"
          type="checkbox"
        />
      </div>

      <div>
        <BaseCheckbox
          label="Live music"
          v-model="music"
          :error="errors.music"
        />
      </div>

      <div>
        <BaseButton type="submit" class="-fill-gradient" something="else">
          Submit
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import { useForm, useField } from "vee-validate";
import { object, string, number, boolean } from "yup";

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
    };
  },
  setup() {
    // const required = (value) => {
    //   const requiredMessage = "This field is required";
    //   if (value === undefined || value === null) return requiredMessage;
    //   if (!String(value).length) return requiredMessage;

    //   return true;
    // };

    // const minLength = (number, value) => {
    //   if (String(value).length < number)
    //     return "Please type at least " + number + " characters";

    //   return true;
    // };

    // const anything = () => {
    //   return true;
    // };

    const validationSchema = object({
      category: string().required(),
      title: string().required("A cool title is required").min(3),
      description: string().required(),
      location: string(),
      pets: number(),
      catering: boolean(),
      music: boolean(),
    });

    const { handleSubmit, errors } = useForm({
      validationSchema,
      initialValues: {
        pets: 1,
        catering: false,
        music: false,
      },
    });

    const { value: category } = useField("category");
    const { value: title } = useField("title");
    const { value: description } = useField("description");
    const { value: location } = useField("location");
    const { value: pets, r } = useField("pets");
    const { value: catering } = useField("catering");
    const { value: music } = useField("music");

    const submit = handleSubmit((values) => {
      console.log("submit", values);
    });

    return {
      category,
      title,
      description,
      location,
      pets,
      catering,
      music,
      submit,
      errors,
    };
    return {};
  },
};
</script>
