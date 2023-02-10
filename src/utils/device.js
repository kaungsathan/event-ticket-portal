import { onMounted, ref } from 'vue'

export default function useDevice() {
    const isMobile = ref(window.innerWidth <= 767)

    onMounted(() => {
        window.addEventListener('resize', function () {
            isMobile.value = window.innerWidth <= 767
        })
    })

    return {
        isMobile
    }
}
