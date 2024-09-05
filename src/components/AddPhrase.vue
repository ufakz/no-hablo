<template>
    <form @submit.prevent="addPhrase" class="p-4 shadow-md bg-white rounded-lg mb-4">
        <input v-model="phraseEnglish" type="text" placeholder="English Phrase"
            class="border p-2 rounded w-full mb-2" />
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add Phrase</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../utils/supabase';
import { translateText } from '../services/TranslationService';

const props = defineProps({
    categoryId: Number,
});

const phraseEnglish = ref('');

async function addPhrase() {
    if (!phraseEnglish.value.trim()) return;

    const translatedText = await translateText(phraseEnglish.value, 'es'); // Spanish translation

    const { data, error } = await supabase.from('phrases').insert([{
        english: phraseEnglish.value.trim(),
        translated: translatedText,
        category_id: props.categoryId,
    }]);

    if (error) {
        console.error('Error adding phrase:', error.message);
    } else {
        phraseEnglish.value = '';
        emit('phrase-added'); 
    }
}
</script>

<style scoped>
</style>