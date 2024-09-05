<template>
    <div class="p-4 shadow-md bg-white rounded-lg mb-4 flex justify-between items-center">
        <div>
            <p class="text-sm font-medium">{{ phrase.english }}</p>
            <p class="text-sm text-gray-600">{{ phrase.translated }}</p>
        </div>
        <button @click="playAudio" class="bg-blue-500 text-white px-3 py-1 rounded">🔊</button>
    </div>
</template>

<script setup>
const props = defineProps({
    phrase: Object,
});

function playAudio() {
    const utterance = new SpeechSynthesisUtterance(props.phrase.translated);
    utterance.lang = 'es'; 
    speechSynthesis.speak(utterance);
}
</script>

<style scoped>
</style>