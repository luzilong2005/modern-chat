<template>
    <div class="flex h-screen w-screen">
        <AppSidebar />
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import AppSidebar from "@renderer/components/AppSidebar";
</script>
