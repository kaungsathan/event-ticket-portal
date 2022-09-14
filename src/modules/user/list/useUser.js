import { ref, onMounted } from "vue";
import { useUserStore } from "../userStore";

export default function useUser() {
  const loading = ref(true);
  const store = useUserStore();
  const customers = ref();
  const searchQuery = ref("");

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

  return {
    customers,
    loading,
    store,
    searchQuery,
  };
}
