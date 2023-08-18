<script setup lang="ts">
import Section2 from "./components/section-2.vue";
import RuleRow from "./components/rule-row.vue";
import { useFieldArray, useForm } from "vee-validate";
import { string, object, minLength, array, nonOptional } from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";
import { Rule, RuleSchema } from "./types";

const schema = toTypedSchema(
  object({
    region: nonOptional(string()),
    rules: array(RuleSchema, [minLength(1, "min 1 rule should be defined")]),
  })
);

const { values, handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    region: "us",
    rules: [{ id: 1, port: 80, certificate: undefined }],
  },
});

const { remove, push, fields } = useFieldArray<Rule>("rules");

function addRule() {
  push({ id: Math.random(), port: 80, certificate: undefined });
}

const onSubmit = handleSubmit((data) => {
  console.log(data, "form");
});
</script>

<template>
  <form
    class="p-8 min-h-screen space-y-4"
    name="app-form"
    @submit.prevent="onSubmit"
  >
    <div class="space-y-2">
      <button
        class="px-4 h-10 rounded-md bg-blue-500 text-white"
        type="button"
        @click="addRule"
      >
        Add rule
      </button>
      <RuleRow
        v-for="(rule, index) in fields"
        :key="rule.key"
        :index="index"
        :rule="rule.value"
        @add="setFieldValue(`rules.${index}.certificate`, { name: 'test' })"
        @delete="remove(index)"
      />
    </div>
    <Section2
      v-if="values.region"
      :value="values.region"
      @change="(value) => setFieldValue('region', value)"
    />
    <button type="submit">Submit</button>
    <pre>values: {{ values }}</pre>
    <ul>
      <li class="text-red-500" v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </form>
</template>
