import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { required, minValue } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from '../store'
import { useStore as useOrganizerStore } from '@/modules/organizer/store'
import { useRoute, useRouter } from 'vue-router'

export const useEdit = () => {
  const store = useStore()
  const organizerStore = useOrganizerStore()
  const route = useRoute()
  const router = useRouter()
  const isLoading = ref(true)
  const state = reactive({
    title: '',
    type: null,
    category: null,
    organizer: null,
    description: '',
    start_date: null,
    end_date: null,
    location: '',
    price: null,
    max_attendees: null
  })

  const eventTypes = ref([
    { name: 'Conference', code: 'conference' },
    { name: 'Workshop', code: 'workshop' },
    { name: 'Seminar', code: 'seminar' },
    { name: 'Concert', code: 'concert' },
    { name: 'Sports', code: 'sports' },
    { name: 'Exhibition', code: 'exhibition' },
    { name: 'Festival', code: 'festival' },
    { name: 'Webinar', code: 'webinar' }
  ])

  const categories = ref([
    { name: 'Technology', code: 'technology' },
    { name: 'Business', code: 'business' },
    { name: 'Education', code: 'education' },
    { name: 'Health & Wellness', code: 'health_wellness' },
    { name: 'Entertainment', code: 'entertainment' },
    { name: 'Sports & Fitness', code: 'sports_fitness' },
    { name: 'Arts & Culture', code: 'arts_culture' },
    { name: 'Food & Drink', code: 'food_drink' },
    { name: 'Travel & Tourism', code: 'travel_tourism' },
    { name: 'Music', code: 'music' },
    { name: 'Charity & Causes', code: 'charity_causes' },
    { name: 'Community', code: 'community' }
  ])

  const organizers = ref([])

  const rules = {
    title: { required },
    type: { required },
    category: { required },
    organizer: { required },
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
    }
  }

  const submitted = ref(false)

  const v$ = useVuelidate(rules, state)

  onMounted(() => {
    fetchEvent()
    fetchOrganizers()
  })

  onBeforeUnmount(() => {
    store.$dispose()
    organizerStore.$dispose()
  })

  const fetchEvent = async () => {
    isLoading.value = true

    try {
      await store.fetchOne({
        id: route.params.id
      })

      const response = store.getOneResponse

      if (response && response.data) {
        const event = response.data
        state.title = event.title || ''
        state.type = event.type || null
        state.category = event.category || null
        state.organizer = event.organizer_id || null
        state.description = event.description || ''
        state.location = event.location || ''
        state.price = event.price || null
        state.max_attendees = event.max_attendees || null

        // Parse dates from string format to Date objects
        if (event.start_date) {
          state.start_date = new Date(event.start_date)
        }
        if (event.end_date) {
          state.end_date = new Date(event.end_date)
        }
      }
    } catch (error) {
      console.error('Failed to fetch event:', error)
    } finally {
      isLoading.value = false
    }
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
      updateEvent()
    }
  }

  const updateEvent = async () => {
    isLoading.value = true

    try {
      // Format dates for API
      const formatDateTime = (date) => {
        if (!date) return null
        const d = new Date(date)
        return d.toISOString().slice(0, 19).replace('T', ' ')
      }

      await store.update({
        id: route.params.id,
        title: state.title,
        type: state.type,
        category: state.category,
        organizer_id: state.organizer,
        description: state.description,
        start_date: formatDateTime(state.start_date),
        end_date: formatDateTime(state.end_date),
        location: state.location,
        price: state.price,
        max_attendees: state.max_attendees
      })

      const response = store.getUpdateResponse

      if (response) {
        router.push({ name: 'eventList' })
      }

      isLoading.value = false
    } catch (error) {
      console.error('Failed to update event:', error)
      isLoading.value = false
    }
  }

  return {
    isLoading,
    state,
    eventTypes,
    categories,
    organizers,
    v$,
    handleSubmit,
    submitted
  }
}
