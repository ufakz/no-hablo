<template>
    <div @click="navigateToCategory" class="cursor-pointer p-4 shadow-md bg-white rounded-lg">
        <h2 class="text-lg font-bold">{{ category.name }}</h2>
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

<style scoped>
</style>