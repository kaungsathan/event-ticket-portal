import { ref, onMounted, watch, onBeforeUnmount, computed } from 'vue'
import { useStore } from '../store'
import { useConfirm } from 'primevue/useconfirm'
import { useDebounceFn } from '@/utils/debounce'
import { multisortConvert } from '@/utils/multisort'
import EventBus from '@/libs/AppEventBus'

export const useList = () => {
  const isLoading = ref(true)
  const store = useStore()
  const confirm = useConfirm()
  const actionMenu = ref()
  const columnMenu = ref()

  const dt = ref() //dt data table
  const lazyParams = ref({})
  const records = ref()
  const totalRecords = ref(0)
  const search = ref('')
  const attributeType = ref('type')

  const statuses = ref([
    { name: 'Active', code: 'Active' },
    { name: 'Inactive', code: 'Inactive' }
  ])

  const columns = ref([
    { field: 'id', header: 'ID', sortable: false, selected: true, style: 'min-width: 5rem', frozen: true },
    { field: 'name', header: 'Name', sortable: false, selected: true, style: 'min-width: 15rem' },
    { field: 'status', header: 'Status', sortable: false, selected: true, style: 'min-width: 15rem' },
    { field: 'actions', header: 'Actions', sortable: false, selected: true, style: 'min-width: 10rem', frozen: true, alignFrozen: 'right' }
  ])

  const selectedStatus = ref(null)
  const selectedDateBetween = ref('')
  const dateBetweenformat = []

  const actionItems = ref([
    {
      label: 'Import',
      icon: 'pi pi-download',
      command: () => {}
    },
    {
      label: 'Export',
      icon: 'pi pi-upload',
      command: () => {}
    }
  ])

  onMounted(() => {
    resetPagination()
    fetchAttributeList()
  })

  onBeforeUnmount(() => {
    store.$dispose()
  })

  const fetchAttributeList = async () => {
    isLoading.value = true
    if (selectedDateBetween.value) {
      for (let i = 0; i < selectedDateBetween.value.length; i += 1) {
        if (selectedDateBetween.value[i] !== null) dateBetweenformat[i] = new Date(Date.UTC(selectedDateBetween.value[i].getFullYear(), selectedDateBetween.value[i].getMonth(), selectedDateBetween.value[i].getDate()))
      }
    }
    //fetch API
    await store.fetchAll({
      page: (lazyParams.value.page += 1), //default page is 0
      per_page: lazyParams.value.rows,
      order: multisortConvert(lazyParams.value.multiSortMeta),
      order_by: 'desc',
      search: search.value,
      status: selectedStatus.value,
      type: attributeType.value,
      date_between: selectedDateBetween.value
    })

    //get response
    const response = store.getAllResponse

    //assign value
    if (response) {
      records.value = response.data.data
      totalRecords.value = response?.data?.total || 0
    }
    isLoading.value = false
  }

  const fetchAttribute = async (id) => {
    await store.fetchOne({
      id: id,
      type: attributeType.value
    })

    const response = store.getOneResponse

    if (response) {
      formData.value = response.data
    }
  }

  const editAttribute = (id) => {
    visible.value = true
    fetchAttribute(id)
  }

  const resetPagination = () => {
    lazyParams.value = {
      page: 0,
      rows: dt.value.rows,
      multiSortMeta: [],
      first: 0
    }
  }

  //Pagination
  const onPage = (event) => {
    lazyParams.value = event
    lazyParams.value.multiSortMeta = []
    fetchAttributeList()
  }

  //Sorting
  const onSort = (event) => {
    lazyParams.value = event
    lazyParams.value.page = 0 // when sorting, page doesn't exist
    lazyParams.value.first = 0
    fetchAttributeList()
  }

  const showConfirmDialog = (id) => {
    confirm.require({
      header: 'Confirmation',
      message: 'Are you sure want to delete?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, delete it',
      rejectLabel: 'Cancel',
      acceptClass: 'p-button-danger',
      rejectClass: 'p-button-secondary p-button-text',
      accept: () => {
        deleteAttribute(id)
      },
      reject: () => {
        //callback to execute when user rejects the action
      },
      onHide: () => {
        //Callback to execute when dialog is hidden
      }
    })
  }

  const deleteAttribute = async (id) => {
    isLoading.value = true

    await store.delete({
      id: id,
      type: attributeType.value
    })
    const response = store.getDeleteResponse

    if (response) {
      EventBus.emit('show-toast', {
        severity: 'success',
        summary: '',
        detail: 'Delete Successfully'
      })
      resetPagination()
      fetchAttributeList()
    }

    isLoading.value = false
  }

  const toggleColumnMenu = (event) => {
    columnMenu.value.toggle(event)
  }

  const selectedColumns = computed(() => {
    return columns.value.filter((col) => col.selected)
  })

  watch(
    [search],
    useDebounceFn(() => {
      resetPagination()
      fetchAttributeList()
    }, 500)
  )

  watch([selectedStatus, selectedDateBetween, attributeType], () => {
    resetPagination()
    fetchAttributeList()
  })

  const visible = ref(false)
  const submitted = ref(false)
  const isSubmitting = ref(false)

  // Form data for the dialog
  const formData = ref({
    name: '',
    status: 'active'
  })

  const showDialog = () => {
    visible.value = true
    // Reset form when opening dialog
    formData.value = {
      name: '',
      status: 'active'
    }
    submitted.value = false
  }

  const closeDialog = () => {
    visible.value = false
    submitted.value = false
    formData.value = {
      name: '',
      status: 'active'
    }
  }

  const handleSubmit = async () => {
    submitted.value = true

    // Basic validation
    if (!formData.value.name || !formData.value.status) {
      return
    }

    if (isSubmitting.value) {
      return
    }

    isSubmitting.value = true

    try {
      const isUpdate = !!formData.value.id

      if (isUpdate) {
        // Update existing attribute
        await store.update({
          id: formData.value.id,
          type: attributeType.value,
          name: formData.value.name,
          status: formData.value.status
        })

        const response = store.getUpdateResponse

        if (response) {
          EventBus.emit('show-toast', {
            severity: 'success',
            summary: '',
            detail: 'Attribute updated successfully'
          })
        }
      } else {
        // Create new attribute
        await store.add({
          type: attributeType.value,
          name: formData.value.name,
          status: formData.value.status
        })

        const response = store.getAddResponse

        if (response) {
          EventBus.emit('show-toast', {
            severity: 'success',
            summary: '',
            detail: 'Attribute created successfully'
          })
        }
      }

      // Close dialog and refresh list
      closeDialog()
      resetPagination()
      fetchAttributeList()
    } catch (error) {
      EventBus.emit('show-toast', {
        severity: 'error',
        summary: '',
        detail: error.message
      })
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    dt,
    lazyParams,
    totalRecords,
    records,
    isLoading,
    search,
    actionItems,
    statuses,
    selectedStatus,
    selectedDateBetween,
    actionMenu,
    showConfirmDialog,
    onPage,
    onSort,
    toggleColumnMenu,
    selectedColumns,
    columns,
    columnMenu,
    visible,
    showDialog,
    formData,
    submitted,
    isSubmitting,
    handleSubmit,
    closeDialog,
    attributeType,
    fetchAttribute,
    editAttribute
  }
}
