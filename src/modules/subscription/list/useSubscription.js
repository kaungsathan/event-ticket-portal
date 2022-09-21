import { ref, onMounted, watch } from "vue"
import { useSubscriptionStore } from "../subscriptionStore"
import { useConfirm } from "primevue/useconfirm"
import { useDebounceFn } from "@/utils/debounce"
import { multisortConvert } from "@/utils/multisort"
import EventBus from "@/libs/AppEventBus"

export default function useUser() {
  const loading = ref(true)
  const store = useSubscriptionStore()
  const confirm = useConfirm()

  const dt = ref() //dt data table
  const lazyParams = ref({})
  const subscriptionList = ref()
  const totalRecords = ref(0)
  const search = ref("")
  const menu = ref()

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
    resetPagination()
    fetchUserList()
  })

  const fetchUserList = async () => {
    loading.value = true

    // lazyParams.value.multiSortMeta.forEach((param) => {
    //   order.push({
    //     column: param.field,
    //     order: param.order === 1 ? "asc" : "desc"
    //   })
    // })

    //fetch API
    await store.fetchAll({
      page: (lazyParams.value.page += 1), //default page is 0
      per_page: lazyParams.value.rows,
      order: multisortConvert(lazyParams.value.multiSortMeta),
      search: search.value
    })

    //get response
    const response = store.getAllResponse
    //assign value
    if (response) {
      subscriptionList.value = response.data.data
      totalRecords.value = response.data.total
    }
    loading.value = false
  }

  const resetPagination = () => {
    lazyParams.value = {
      page: 0,
      rows: dt.value.rows,
      multiSortMeta: []
    }
  }

  //Pagination
  const onPage = (event) => {
    lazyParams.value = event
    lazyParams.value.multiSortMeta = []
    fetchUserList()
  }

  //Sorting
  const onSort = (event) => {
    lazyParams.value = event
    lazyParams.value.page = 0 // when sorting, page doesn't exist
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
      EventBus.emit("show-toast", {
        severity: "success",
        summary: "",
        detail: "Delete Successfully"
      })
      fetchUserList()
    }

    loading.value = false
  }

  const toggleMenu = (event) => {
    menu.value.toggle(event)
  }

  watch(
    [search],
    useDebounceFn(() => {
      resetPagination()
      fetchUserList()
    }, 500)
  )

  return {
    dt,
    lazyParams,
    totalRecords,
    subscriptionList,
    loading,
    store,
    search,
    actionItems,
    menu,
    toggleMenu,
    deleteUser,
    showConfirmDialog,
    onPage,
    onSort
  }
}
