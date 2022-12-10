<template>
  <div>
    <div class="card mb-4">
      <h5>Filter</h5>
      <div class="grid">
        <div class="field col-12 md:col-6 lg:col-4">
          <Dropdown
            v-model="selectedRole"
            :options="roles"
            optionLabel="name"
            optionValue="code"
            placeholder="Select role"
            class="w-full"
          />
        </div>
      </div>
    </div>
    <div class="card">
      <DataTable
        ref="dt"
        data-key="id"
        :lazy="true"
        :paginator="true"
        :value="customers"
        @page="onPage($event)"
        @sort="onSort($event)"
        sortMode="multiple"
        :multiSortMeta="lazyParams.multiSortMeta"
        :totalRecords="totalRecords"
        :rows="10"
        :rows-per-page-options="[10, 20, 50]"
        :scrollable="true"
        scrollHeight="450px"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
        responsive-layout="scroll"
        :loading="loading"
      >
        <template #header>
          <div
            class="flex flex-wrap justify-content-between align-items-center"
          >
            <h5 class="m-0">{{ $t("user") }}</h5>
            <span class="p-input-icon-left">
              <div class="mt-3 md:mt-0">
                <span class="p-input-icon-left w-full md:w-auto">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="search"
                    placeholder="Keyword Search"
                    class="w-full md:w-auto"
                  />
                </span>
                <router-link
                  v-if="$can('create', 'users')"
                  :to="{ name: 'newUser' }"
                >
                  <Button
                    label="New"
                    class="p-button-success ml-0 md:ml-2 mt-2 md:mt-0"
                  />
                </router-link>
                <Menu ref="menu" :model="actionItems" :popup="true" />
                <Button
                  icon="pi pi-cog"
                  @click="toggleMenu"
                  class="p-button-success p-button-outlined ml-2 mt-2 md:mt-0"
                />
              </div>
            </span>
          </div>
        </template>
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <Column
          field="firstName"
          header="First Name"
          :sortable="true"
          style="min-width: 15rem"
          frozen
        >
          <template #body="slotProps">
            <Avatar
              :image="slotProps.data.image"
              size="medium"
              shape="circle"
              class="mr-2"
            />
            {{ slotProps.data.firstName }}
          </template>
        </Column>
        <Column
          field="age"
          header="Age"
          :sortable="true"
          style="min-width: 5rem"
        />

        <Column
          field="phone"
          header="Phone Number"
          :sortable="true"
          style="min-width: 10rem"
        />

        <Column
          field="email"
          header="Email Address"
          :sortable="true"
          style="min-width: 10rem"
        />

        <Column
          field="gender"
          header="Gender"
          :sortable="true"
          style="min-width: 10rem"
        >
          <template #body="slotProps">
            <Chip
              :label="slotProps.data.gender.toUpperCase()"
              class="mr-2"
            ></Chip>
          </template>
        </Column>

        <Column
          header="Actions"
          style="min-width: 10rem"
          alignFrozen="right"
          frozen
        >
          <template #body="{ data }">
            <div class="flex">
              <router-link
                v-if="$can('edit', 'users')"
                :to="{ name: 'editUser', params: { id: data.id } }"
              >
                <Button
                  type="button"
                  icon="pi pi-pencil"
                  class="mr-2 p-button-info p-button-rounded p-button-outlined"
                />
              </router-link>
              <Button
                v-if="$can('delete', 'users')"
                type="button"
                icon="pi pi-trash"
                class="p-button-danger p-button-rounded p-button-outlined"
                @click="showConfirmDialog(data.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
      <ConfirmDialog :showHeader="false">
        <template #message="slotProps">
          <div class="text-center w-full">
            <Button
              type="button"
              :icon="slotProps.message.icon"
              class="p-button-lg p-button-danger p-button-rounded p-button-outlined mt-4"
            />
            <h4>{{ slotProps.message.message }}</h4>
          </div>
        </template></ConfirmDialog
      >
    </div>
  </div>
</template>

<script>
import Avatar from "primevue/avatar"
import Button from "primevue/button"
import Column from "primevue/column"
import Chip from "primevue/chip"
import DataTable from "primevue/datatable"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import Menu from "primevue/menu"
import ConfirmDialog from "primevue/confirmdialog"

import { defineComponent } from "vue"
import useList from "./useList"

export default defineComponent({
  name: "UserList",
  components: {
    Avatar,
    Button,
    Column,
    Chip,
    DataTable,
    InputText,
    Dropdown,
    Menu,
    ConfirmDialog
  },
  setup() {
    const {
      dt,
      lazyParams,
      totalRecords,
      customers,
      loading,
      store,
      search,
      actionItems,
      roles,
      selectedRole,
      menu,
      toggleMenu,
      deleteUser,
      showConfirmDialog,
      onPage,
      onSort
    } = useList()

    return {
      dt,
      lazyParams,
      totalRecords,
      customers,
      loading,
      store,
      search,
      actionItems,
      roles,
      selectedRole,
      menu,
      toggleMenu,
      deleteUser,
      showConfirmDialog,
      onPage,
      onSort
    }
  }
})
</script>

<i18n src="./../locale.json">
</i18n>

<style lang="scss" scoped>
img {
  vertical-align: middle;
}
::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;

  .p-progressbar-value {
    background-color: #607d8b;
  }
}

::v-deep(.p-datepicker) {
  min-width: 25rem;

  td {
    font-weight: 400;
  }
}

::v-deep(.p-datatable.p-datatable-customers) {
  .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }

  .p-paginator {
    padding: 1rem;
  }

  .p-datatable-thead > tr > th {
    text-align: left;
  }

  .p-datatable-tbody > tr > td {
    cursor: auto;
  }

  .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;
  }
}
</style>
