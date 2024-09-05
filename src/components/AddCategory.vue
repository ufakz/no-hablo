<template>
    <form @submit.prevent="addCategory" class="p-4 shadow-md bg-white rounded-lg mb-4">
        <input v-model="categoryName" type="text" placeholder="New Category" class="border p-2 rounded w-full" />
        <button type="submit" class="mt-2 bg-green-500 text-white px-4 py-2 rounded">Add Category</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../utils/supabase';
import { generatePhrases, translateText } from '../services/text';

const emit = defineEmits(['category-added'])

const categoryName = ref('');

async function addCategory() {
    if (!categoryName.value.trim()) return;

    try {
        // const response = await fetch('/.netlify/functions/upload-icon', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ categoryName: categoryName.value.trim() }),
        // });

        // const result = await response.json();

        // console.log(result);

        const { data, error } = await supabase.from('categories').insert([{ name: categoryName.value.trim() }]).select();

        if (error) {
            console.error('Error adding category:', error.message);
        } else {
            categoryName.value = '';
        }

        const phrases = await generatePhrases(data[0].name)

        const translatedPhrasesPromises = phrases.map(async (phrase) => {
            const translation = await translateText(phrase, 'Spanish'); 
            return {
                category_id: data[0].id,
                english: phrase,
                translated: translation,
            };
        });

        const translatedPhrases = await Promise.all(translatedPhrasesPromises);

        const { data: phraseData, error: phraseInsertError } = await supabase.from('phrases').insert(translatedPhrases);

        if (phraseInsertError) {
            throw new Error(`Error inserting phrases: ${phraseInsertError.message}`);
        } else {
            categoryName.value = '';
            emit('category-added');
        }

    } catch (error) {
        console.error('Error adding category:', error.message);
    }

}
</script>

<style scoped></style>