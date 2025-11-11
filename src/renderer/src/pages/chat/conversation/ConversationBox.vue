<template>
    <div class="hover:bg-mc-hover flex h-12 w-full space-x-3 items-center justify-between rounded-lg px-3">
        <p class="text-mc-text-primary truncate text-lg select-none">hello.</p>
        <IconButton class="size-8">
            <MoreHorizontalIcon class="text-mc-text-secondary hover:text-mc-text-primary size-5" />
        </IconButton>
    </div>
</template>

<script setup lang="ts">
import { IconButton } from "@renderer/components/IconButton";
import { MoreHorizontalIcon } from "lucide-vue-next";
</script>
