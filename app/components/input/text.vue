<script setup lang="ts">
interface Props{
    id:string,
    label?:string,
    placeholder?:string,
    help?:string,
    type?:string,
    required?:boolean,
    disabled?:boolean,
    invalid?:boolean,
   
}
const model =defineModel<string | null>({required:true})
const props = defineProps<Props>()


</script>
<template>
    <div class="flex flex-col gap-2 w-full">
        <label :for="props.id" class="truncate">
            {{ props.label }}

        </label>
        <p-input-text
        
         :id="props.id"
         v-model="model"
         :placeholder="props.placeholder"
         variant="filled"
         :type="props.type"
         fluid
         :invalid="props.invalid"
         :disabled="props.disabled"
         :required="props.required"
         :aria-describedby="props.help ? `${$props.id}-help`:undefined"
         />
         <small v-if="props.help" :id="`${$props.id}-help`">
            {{ props.help }}

         </small>
    </div>
</template>

