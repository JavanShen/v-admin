<template>
  <div class="edit">
    <mark-down></mark-down>
    <file-upload></file-upload>
  </div>
</template>

<script>
import { MarkDown, FileUpload } from "@/components/edit";

export default {
  name: "Edit",
  components: {
    MarkDown,
    FileUpload,
  },
};
</script>