<template>
    <div class="p-4">
      <AddPhrase :categoryId="categoryId" @phrase-added="fetchPhrases" />
      <div>
        <PhraseCard v-for="phrase in phrases" :key="phrase.id" :phrase="phrase" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { supabase } from '../utils/supabase';
  import { useRoute } from 'vue-router';
  import AddPhrase from '../components/AddPhrase.vue';
  import PhraseCard from '../components/PhraseCard.vue';
  
  const route = useRoute();
  const categoryId = Number(route.params.id);
  
  const phrases = ref([]);
  
  async function fetchPhrases() {
    const { data, error } = await supabase.from('phrases').select('*').eq('category_id', categoryId).order('id', { ascending: false });
    if (!error) phrases.value = data;
  }
  
  onMounted(fetchPhrases);
  </script>
  
  <style scoped>
  </style>
  