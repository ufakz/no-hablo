<template>
    <div class="p-4">
        <AddCategory @category-added="fetchCategories" />
        <div class="grid grid-cols-2 gap-4">
            <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../utils/supabase';
import AddCategory from '../components/AddCategory.vue';
import CategoryCard from '../components/CategoryCard.vue';

const categories = ref([]);

async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('*');
    if (!error) categories.value = data;
}

onMounted(fetchCategories);
</script>

<style scoped>
</style>