<script setup lang="ts">
interface Props{
    id:string,
    label:string,
    placeholder?:string,
    help?:string,
    type?:string,
    required?:boolean,
    disabled?:boolean,
    feedback?:boolean,
    invalid?:boolean,
    promptLabel?:string,
    weakLabel?: string
    mediumLabel?: string
    strongLabel?: string
}
const model =defineModel<string | null>({required:true})
const props = defineProps<Props>()

</script>
<template>
    <div class="flex flex-col gap-2 w-full">
        <label :for="props.id" class="truncate">
            {{ props.label }}

        </label>
        <p-password
         :id="props.id"
         v-model="model"
         :placeholder="props.placeholder"
         :feedback="props.feedback"
         variant="filled"
         :type="props.type"
         fluid
         toggle-mask
         :invalid="props.invalid"
         :disabled="props.disabled"
         :required="props.required"
         :promp-label="props.promptLabel"
         :weak-label="props.weakLabel"
         :medium-label="props.mediumLabel"
         :strong-label="props.strongLabel"
         :aria-describedby="props.help ? `${$props.id}-help`:undefined"
         />
         <small v-if="props.help" :id="`${$props.id}-help`">
            {{ props.help }}

         </small>
    </div>
</template>



