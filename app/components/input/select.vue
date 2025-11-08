<script lang="ts" setup >
type Props = {
  id: string
  label?: string
  placeholder?: string
  help?: string
  required?: boolean
  items: Array<{ value: number; label: string }>
  checkmark?: boolean
  highlightOnSelect?: boolean
  disabled?: boolean
  onChange?: (value: any | undefined) => void
}

const model = defineModel<any>({ required: true })
const props = defineProps<Props>()
function handleChange(value: any | undefined) {
  if (props.onChange) {
    props.onChange(value)
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <label
      class="truncate"
      :for="props.id"
    >
      {{ props.label }}
    </label>

    <p-select
      v-model="model"
      :input-id="props.id"
      :options="props.items"
      option-label="label"
      :placeholder="props.placeholder"
      variant="filled"
      fluid
      :disabled="props.disabled"
      :required="props.required"
      :checkmark="props.checkmark"
      :highlight-on-select="props.highlightOnSelect"
      :aria-describedby="props.help ? `${props.id}-help` : undefined"
      @change="handleChange($event)"
    />

    <small
      v-if="props.help"
      :id="`${props.id}-help`"
    >
      {{ props.help }}
    </small>
  </div>
</template>