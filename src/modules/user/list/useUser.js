import { ref, onMounted } from "vue";
import { useUserStore } from "../userStore";

export default function useUser() {
  const loading = ref(true);
  const store = useUserStore();
  const customers = ref();
  const searchQuery = ref("");
  const showDeleteDialog = ref(false);
  const selectedId = ref("");

  onMounted(() => {
    fetchUserList();
  });

  const fetchUserList = async () => {
    //fetch API
    await store.fetchAll();
    //get response
    const response = store.getAllResponse;
    //assign value
    if (response) {
      customers.value = response.users;
    }

    loading.value = false;
  };

  const showConfirmDialog = (id) => {
    selectedId.value = id;
    showDeleteDialog.value = true;
  };

  const deleteUser = async () => {
    showDeleteDialog.value = false;
    loading.value = true;
    await store.delete({ id: selectedId.value });

    const response = store.getDeleteResponse;

    if (response) {
      fetchUserList();
    }

    loading.value = false;
  };

  return {
    showDeleteDialog,
    showConfirmDialog,
    customers,
    loading,
    store,
    searchQuery,
    deleteUser,
  };
}
