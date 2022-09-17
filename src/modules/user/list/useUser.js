import { ref, onMounted, watch } from "vue"
import { useUserStore } from "../userStore"
import { useConfirm } from "primevue/useconfirm"
import { useDebounceFn } from "@/utils/debounce"

export default function useUser() {
  const loading = ref(true)
  const store = useUserStore()
  const confirm = useConfirm()

  const dt = ref() //dt data table
  const lazyParams = ref({
    first: 0,
    sortField: null,
    sortOrder: null
  })
  const customers = ref()
  const totalRecords = ref(0)
  const searchQuery = ref("")
  const selectedRole = ref("")
  const menu = ref()
  const roles = ref([
    { name: "Admin", code: "admin" },
    { name: "Manager", code: "manager" },
    { name: "Staff", code: "staff" },
    { name: "User", code: "user" }
  ])
  const actionItems = ref([
    {
      label: "Import",
      icon: "pi pi-download",
      command: () => {}
    },
    {
      label: "Export",
      icon: "pi pi-upload",
      command: () => {}
    }
  ])

  onMounted(() => {
    fetchUserList()
  })

  const fetchUserList = async () => {
    loading.value = true

    //fetch API
    await store.fetchAll({
      page: lazyParams.value.page,
      search: searchQuery.value,
      role: selectedRole.value
    })

    //get response
    const response = store.getAllResponse
    //assign value
    if (response) {
      customers.value = response.users

      totalRecords.value = customers.value.length
    }
    loading.value = false
  }

  const resetPagination = () => {
    lazyParams.value.page = 0
  }

  //Pagination
  const onPage = (event) => {
    lazyParams.value = event
    fetchUserList()
  }

  //Sorting
  const onSort = (event) => {
    lazyParams.value = event
    console.log(lazyParams.value)
    fetchUserList()
  }

  const showConfirmDialog = (id) => {
    confirm.require({
      message: "Are you sure?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes, delete it",
      rejectLabel: "Cancel",
      acceptClass: "p-button-danger",
      rejectClass: "p-button-danger p-button-text",
      accept: () => {
        deleteUser(id)
      },
      reject: () => {
        //callback to execute when user rejects the action
      },
      onHide: () => {
        //Callback to execute when dialog is hidden
      }
    })
  }

  const deleteUser = async (id) => {
    loading.value = true
    await store.delete({ id: id })

    const response = store.getDeleteResponse

    if (response) {
      fetchUserList()
    }

    loading.value = false
  }

  const toggleMenu = (event) => {
    menu.value.toggle(event)
  }

  watch(
    [searchQuery],
    useDebounceFn(() => {
      resetPagination()
      fetchUserList()
    }, 500)
  )

  watch([selectedRole], () => {
    fetchUserList()
  })

  return {
    dt,
    lazyParams,
    totalRecords,
    customers,
    loading,
    store,
    searchQuery,
    selectedRole,
    roles,
    actionItems,
    menu,
    toggleMenu,
    deleteUser,
    showConfirmDialog,
    onPage,
    onSort
  }
}
