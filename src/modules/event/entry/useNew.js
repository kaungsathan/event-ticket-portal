import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { required, minValue } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '../store'
import { useStore as useOrganizerStore } from '@/modules/organizer/store'
import { useStore as useAttributeStore } from '@/modules/setting/attribute/store'
import { useRouter } from 'vue-router'
import placeholderImage from '@/assets/images/placeholder.png'

export const useNew = () => {
  const store = useStore()
  const organizerStore = useOrganizerStore()
  const attributeStore = useAttributeStore()
  const router = useRouter()
  const isLoading = ref(false)
  const imagePreview = ref(placeholderImage)
  const state = reactive({
    title: '',
    type_id: null,
    organizer_id: null,
    tag_id: null,
    category_id: null,
    description: '',
    start_date: null,
    end_date: null,
    location: '',
    price: null,
    max_attendees: null,
    image: null
  })

  const eventTypes = ref([])

  const categories = ref([])

  const tags = ref([])

  const organizers = ref([])

  const rules = {
    title: { required },
    type_id: { required },
    organizer_id: { required },
    tag_id: { required },
    category_id: { required },
    description: {},
    start_date: { required },
    end_date: { required },
    location: { required },
    price: {
      required,
      minValue: minValue(0)
    },
    max_attendees: {
      required,
      minValue: minValue(1)
    },
    image: {}
  }

  const submitted = ref(false)

  const v$ = useVuelidate(rules, state)

  onMounted(async () => {
    await fetchOrganizers()
    await fetchCategories()
    await fetchTypes()
    await fetchTags()
  })

  onBeforeUnmount(() => {
    store.$dispose()
    organizerStore.$dispose()
    attributeStore.$dispose()
  })

  const fetchCategories = async () => {
    isLoading.value = true
    await attributeStore.fetchAll({
      page: 1,
      per_page: 1000,
      status: 'active',
      type: 'category'
    })

    const response = attributeStore.getAllResponse
    if (response) {
      categories.value = response.data.data.map((category) => ({
        code: category.id,
        name: category.name
      }))
    }
    isLoading.value = false
  }

  const fetchTypes = async () => {
    isLoading.value = true
    await attributeStore.fetchAll({
      page: 1,
      per_page: 1000,
      status: 'active',
      type: 'type'
    })

    const response = attributeStore.getAllResponse
    if (response) {
      eventTypes.value = response.data.data.map((type) => ({
        code: type.id,
        name: type.name
      }))
    }
    isLoading.value = false
  }

  const fetchTags = async () => {
    isLoading.value = true
    await attributeStore.fetchAll({
      page: 1,
      per_page: 1000,
      status: 'active',
      type: 'tag'
    })

    const response = attributeStore.getAllResponse
    if (response) {
      tags.value = response.data.data.map((tag) => ({
        code: tag.id,
        name: tag.name
      }))
    }
    isLoading.value = false
  }

  const fetchOrganizers = async () => {
    try {
      await organizerStore.fetchAll({
        page: 1,
        per_page: 1000, // Get all organizers
        status: 'active'
      })

      const response = organizerStore.getAllResponse

      if (response && response.data) {
        organizers.value = response.data.data.map((organizer) => ({
          id: organizer.id,
          name: organizer.company_name
        }))
      }
    } catch (error) {
      console.error('Failed to fetch organizers:', error)
    }
  }

  const handleSubmit = (isFormValid) => {
    submitted.value = true

    if (!isFormValid) {
      return
    }

    if (!isLoading.value) {
      addEvent()
    }
  }

  const addEvent = async () => {
    isLoading.value = true

    try {
      // Format dates for API
      const formatDateTime = (date) => {
        if (!date) return null
        const d = new Date(date)
        return d.toISOString().slice(0, 19).replace('T', ' ')
      }

      await store.add({
        title: state.title,
        type_id: state.type_id,
        organizer_id: state.organizer_id,
        tag_id: state.tag_id,
        category_id: state.category_id,
        description: state.description,
        start_date: formatDateTime(state.start_date),
        end_date: formatDateTime(state.end_date),
        location: state.location,
        price: state.price,
        max_attendees: state.max_attendees,
        image: state.image
      })

      const response = store.getAddResponse

      if (response) {
        router.push({ name: 'eventList' })
      }

      isLoading.value = false
    } catch (error) {
      console.error('Failed to create event:', error)
      isLoading.value = false
    }
  }

  const onFileChange = (event) => {
    const file = event.files[0] // Assuming event.target is the input element

    if (file) {
      state.image = file
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const onFileRemove = () => {
    state.image = null
    imagePreview.value = placeholderImage
  }

  return {
    isLoading,
    state,
    eventTypes,
    categories,
    organizers,
    tags,
    v$,
    handleSubmit,
    submitted,
    onFileChange,
    onFileRemove,
    imagePreview
  }
}
