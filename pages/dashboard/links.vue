<template>
  <main class="w-full lg:w-3/5 bg-white md:h-[560px] rounded-lg p-4">
    <TabLayout
      title="Customize your links"
      description="Add/edit/remove links below and then share all your profiles with the world!"
      @handleSave="handleSave"  
    >
      <template #body>
        <BaseButton
          @click="addLink"
          buttonText="Add Link"
          iconName="ic:outline-add"
          buttonColor="bg-white"
          class="w-full mt-4 p-2 rounded-lg border border-purple-secondary text-purple-secondary hover:bg-light-gray-secondary"
        />
        <!-- DISPLAY IF NO DEVLINKS YET -->
        <div
          class="get-started bg-light-gray-primary rounded-lg w-full flexCenter flex-col mt-4 py-4"
          v-if="links.length === 0"
        >
          <div class="image w-full flexCenter">
            <img
              src="~/assets/images/link-image.png"
              alt="Link Sharing Image"
              class="w-1/3"
            />
          </div>
          <div class="get-started-text text-center p-4 md:w-3/4">
            <h1 class="text-2xl font-bold">Let's get you started</h1>
            <p class="text-dark-gray-primary text-sm">
              Use the "Add new link" to get started. Once you have more than one
              link, you can reorder and edit them. We're here to help you share
              your profiles with everyone!
            </p>
          </div>
        </div>
        <!-- DISPLAY IF NO DEVLINKS YET -->

        <!-- DISPLAY IF DEVLINKS AVAILABLE -->
        <div class="link-wrappper max-h-[300px] overflow-y-auto" v-else>
          <draggable v-model="links" itemKey="id" @end="handleDragEnd">
            <template #item="{ element, index }">
              <LinkDetailComponent
                :key="element.id"
                :link="element"
                :index="index"
                @removeLink="removeLink(index)"
                @updateOption="updateOption($event, index)"
                @updateLink="updateLink($event, index)"
              />
            </template>
          </draggable>
        </div>
      </template>
    </TabLayout>
  </main>
</template>

<script setup lang="ts">
import type LinkOptions from "~/types/LinkOptions";
import draggable from "vuedraggable";

definePageMeta({
  layout: "onboard",
});
const devlinks = useDevLinks();
const toast = useToast();
const { addToast } = toast;
const { links } = storeToRefs(devlinks);

const inputedLink = ref("");
const selectedOption = ref("");

const removeLink = (index: number) => {
  devlinks.removeLink(index);
  addToast("Removed link from tab", "success");
};
const addLink = () => {
  devlinks.addLink({
    platform: selectedOption.value,
    link: inputedLink.value,
    bgColor: "",
    textColor: "",
    icon: "",
  });
  addToast("Added data to tab", "success");
};
const updateOption = async (option: LinkOptions, index: number) => {
  selectedOption.value = option.value;
  const updatedLink = {
    ...links.value[index],
    platform: option.value,
    bgColor: option.bgColor,
    textColor: option.textColor,
    icon: option.icon,
  };
    
  await devlinks.updateLink(index, updatedLink); // Call the store method
  selectedOption.value = "";
};
const updateLink = async (value: string, index: number) => {
  inputedLink.value = value;
  const updatedLink = { ...links.value[index], link: value };
  await devlinks.updateLink(index, updatedLink); // Call the store method
  inputedLink.value = "";
};

const handleDragEnd = async () => {
  await devlinks.updateLinkOrder(links.value);
  addToast("Reordered links", "success");
};

const handleSave = () => {
  devlinks.setupRealtimeListener();
  addToast("Saved data to tab", "success");
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  @apply bg-purple-secondary rounded-xl;
}

::-webkit-scrollbar-track {
  @apply bg-light-gray-secondary rounded-xl;
}
</style>
