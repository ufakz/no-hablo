<template>
    <div @click="navigateToCategory" class="cursor-pointer p-4 shadow-md bg-white rounded-lg">
        <img v-if="category.icon_url" :src="category.icon_url" alt="Category Icon" class="w-12 h-12 mb-2" />
        <h2 class="text-lg font-semibold mb-2">{{ category.name }}</h2>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    category: Object,
});

const router = useRouter();

function navigateToCategory() {
    router.push(`/category/${props.category.id}`);
}
</script>

<style scoped></style>