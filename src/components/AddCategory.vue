<template>
    <form @submit.prevent="addCategory" class="p-4 shadow-md bg-white rounded-lg mb-4">
        <input v-model="categoryName" type="text" placeholder="New Category" class="border p-2 rounded w-full" />
        <button type="submit" class="mt-2 bg-green-500 text-white px-4 py-2 rounded">Add Category</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../utils/supabase';

const categoryName = ref('');

async function addCategory() {
    if (!categoryName.value.trim()) return;

    const { data, error } = await supabase.from('categories').insert([{ name: categoryName.value.trim() }]);

    if (error) {
        console.error('Error adding category:', error.message);
    } else {
        categoryName.value = '';
        emit('category-added');
    }
}
</script>

<style scoped>
/* Add any specific styling if needed */
</style>