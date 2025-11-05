<template>
  <header
    class="flex flex-col items-center gap-4 px-6 pt-8 pb-6 md:flex-row md:items-end sm:justify-between print:px-0"
  >
    <!-- Hero section -->
    <div
      class="flex flex-col md:flex-row items-center gap-3 print:flex-row print:items-center print:gap-3"
    >
      <div class="size-30 shrink-0 overflow-hidden rounded-full">
        <img :src="ProfilePhoto" alt="Valerij Medviď" class="h-full w-full object-cover" />
      </div>

      <div>
        <h1
          class="text-2xl font-bold leading-tight tracking-tight text-center md:text-left print:text-left"
        >
          Valerij Medviď
        </h1>
        <p
          class="text-sm text-neutral-600 dark:text-neutral-400 text-center md:text-left print:text-left"
        >
          Frontend Developer · Vue & TypeScript
        </p>

        <div
          class="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 text-center md:text-left justify-center md:justify-start print:text-left"
        >
          <span class="inline-flex items-center gap-1">
            <UiIcon name="mappin" :size="12" />
            Czechia
          </span>

          <span class="inline-flex items-center gap-1">
            <UiIcon name="briefcase" :size="12" />
            10+ yrs in IT
          </span>

          <span class="inline-flex items-center gap-1">
            <UiIcon name="calendar" :size="12" />
            Open to interesting projects
          </span>
        </div>
      </div>
    </div>

    <!-- Links section -->
    <div
      class="flex md:flex-col sm:flex-row sm:items-center flex-wrap items-center md:items-end lg:flex-row gap-2 print:hidden justify-center md:justify-start"
    >
      <UiButton label="Github" icon="github" href="https://github.com/valerijmedvid" />
      <UiButton
        label="LinkedIn"
        icon="linkedin"
        href="https://www.linkedin.com/in/valerijmedvid/"
      />
      <UiButton label="Export PDF" icon="download" @click="printPage" is-dark />
    </div>
  </header>

  <!-- Summary section -->
  <div class="px-6 pb-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 print:px-0">
    I’m a {{ getAge('1990-01-22') }}-year-old developer focused on building applications
    end-to-end—from idea to production. I’m naturally curious, always learning and refining my
    craft. I enjoy tinkering with IoT and smart-home projects, and outside the screen you’ll find me
    doing sports, traveling, or riding my motorbike.
  </div>
</template>

<script setup lang="ts">
import ProfilePhoto from '/src/assets/vili.webp'
import UiButton from './ui/UiButton.vue'
import UiIcon from './ui/UiIcon.vue'

const printPage = (): void => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}

function getAge(birthDate: string) {
  const today = new Date()
  const birth = new Date(birthDate)

  let age = today.getFullYear() - birth.getFullYear()
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())

  if (!hasHadBirthdayThisYear) {
    age--
  }

  return age
}
</script>
