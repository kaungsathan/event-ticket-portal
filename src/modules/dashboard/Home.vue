<template>
  <div>
    <div ref="printcontent">Please print me ):</div>
    <button @click="printMe">Print Me</button>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import html2canvas from "html2canvas"
export default defineComponent({
  name: "Dashboard",
  setup() {
    const printcontent = ref()

    const printMe = async () => {
      console.log("printing..")
      const el = printcontent.value

      const options = {
        type: "dataURL"
      }
      const printCanvas = await html2canvas(el, options)

      const link = document.createElement("a")
      link.setAttribute("download", "download.png")
      link.setAttribute(
        "href",
        printCanvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      )
      link.click()

      console.log("done")
    }

    return {
      printcontent,
      printMe
    }
  }
})
</script>
<style lang=""></style>
