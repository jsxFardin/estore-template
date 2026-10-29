<script setup lang="ts">
import HeroPromoSlider from '@/components/home/HeroPromoSlider.vue'
import CampaignShortcuts from '@/components/home/CampaignShortcuts.vue'
import ProductGroups from '@/components/home/ProductGroups.vue'
import CampaignSlider from '@/components/home/CampaignSlider.vue'
import CategoryIcons from '@/components/home/CategoryIcons.vue'
import ProductSection from '@/components/home/ProductSection.vue'
import BrandGrid from '@/components/home/BrandGrid.vue'
import TagTiles from '@/components/home/TagTiles.vue'
import { brandSections, extraSections, productSections } from '@/data/productSections'
import { skinTypes } from '@/data/skinTypes'
import { site } from '@/data/site'
import { useHead } from '@/composables/useHead'

useHead({ title: site.title })
</script>

<template>
  <h1 class="sr-only">{{ site.description }}</h1>
  <HeroPromoSlider />
  <CampaignShortcuts />
  <ProductGroups />
  <CampaignSlider />
  <CategoryIcons />
  <ProductSection v-for="s in productSections" :key="s.id" :section="s" />
  <BrandGrid />
  <CategoryIcons :items="skinTypes" title="Shop by Skin Type" />
  <TagTiles />
  <ProductSection v-for="s in brandSections" :key="s.id" :section="s" />
  <ProductSection v-for="s in extraSections" :key="s.id" :section="s" />
</template>
