<template>
  <div>
    <div class="mb-6 rounded-xl border border-surface-200 p-4">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <!-- <div>
          <label class="mb-2 flex items-center text-sm"><i class="pi pi-filter"></i>&nbsp;{{ $t('Status') }} </label>
          <Select v-model="selectedStatus" :options="statuses" optionLabel="name" optionValue="code" placeholder="Select status" class="w-full" showClear />
        </div> -->

        <div>
          <Button label="Type" severity="secondary" class="w-full" :class="{ 'bg-blue-500 text-white hover:bg-blue-600': attributeType === 'type' }" @click="attributeType = 'type'" />
        </div>

        <div>
          <Button label="Category" severity="secondary" class="w-full" :class="{ 'bg-blue-500 text-white hover:bg-blue-600': attributeType === 'category' }" @click="attributeType = 'category'" />
        </div>

        <div>
          <Button label="Tag" severity="secondary" class="w-full" :class="{ 'bg-blue-500 text-white hover:bg-blue-600': attributeType === 'tag' }" @click="attributeType = 'tag'" />
        </div>

        <!-- <div>
          <label class="mb-2 flex items-center text-sm"><i class="pi pi-filter"></i>&nbsp;{{ $t('Date') }}</label>
          <DatePicker :placeholder="$t('Date Range')" inputId="selectedDateBetween" v-model="selectedDateBetween" selectionMode="range" :manualInput="false" dateFormat="dd/mm/yy" class="w-full" showIcon :showButtonBar="true" />
        </div> -->
      </div>
    </div>
    <div class="overflow-hidden rounded-xl border border-surface-200">
      <DataTable
        ref="dt"
        dataKey="id"
        size="small"
        :lazy="true"
        :paginator="true"
        :value="records"
        @page="onPage($event)"
        @sort="onSort($event)"
        sortMode="multiple"
        :multiSortMeta="lazyParams.multiSortMeta"
        :totalRecords="totalRecords"
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50, 100]"
        :scrollable="true"
        :first="lazyParams.first"
        scrollHeight="60vh"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        :loading="isLoading"
        responsiveLayout="scroll"
        class="p-4"
      >
        <template #header>
          <div class="flex flex-wrap justify-end gap-2">
            <IconField class="w-full md:w-auto">
              <InputIcon class="pi pi-search" />
              <InputText v-model="search" placeholder="Keyword Search" class="w-full md:w-auto" />
            </IconField>
            <Button label="New" severity="success" @click="showDialog" />

            <Popover ref="columnMenu" appendTo="body" id="columnPanel" style="width: 250px">
              <div v-for="column in columns" :key="column.field" class="my-1 flex gap-4">
                <Checkbox :inputId="column.field" name="column" :modelValue="column.selected" :binary="true" @change="column.selected = !column.selected" :disabled="column.frozen" />
                <label :for="column.field">{{ column.header }}</label>
              </div>
            </Popover>
            <Button icon="pi pi-sliders-h" @click="toggleColumnMenu" outlined severity="secondary" />
          </div>
        </template>
        <template #empty>
          <div class="text-center">No records found.</div>
        </template>
        <template #loading>
          <div class="text-center">Loading records data. Please wait.</div>
        </template>

        <Column v-for="column in selectedColumns" :key="column.field" :field="column.field" :header="column.header" :sortable="column.sortable" :frozen="!isMobile && column.frozen" :alignFrozen="column.alignFrozen" :style="column.style">
          <template v-if="column.field === 'actions'" #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="$can('manage', 'settings')" type="button" icon="pi pi-pencil" size="small" text rounded outlined @click="editAttribute(data.id)" />
              <Button v-if="$can('manage', 'settings')" type="button" size="small" icon="pi pi-trash" severity="danger" text rounded @click="showConfirmDialog(data.id)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Menu ref="actionMenu" :model="actionItems" :popup="true" />
  <ConfirmDialog>
    <template #message="slotProps">
      <div class="w-full text-center">
        <i :class="slotProps.message.icon" class="mt-2 text-red-500" style="font-size: 3rem"></i>
        <div class="mt-2">{{ slotProps.message.message }}</div>
      </div>
    </template>
  </ConfirmDialog>

  <Dialog v-model:visible="visible" modal header="Attribute" :style="{ width: '25rem' }" :closable="true">
    <form @submit.prevent="handleSubmit">
      <!-- Type Name -->
      <div class="mb-6">
        <label for="typeName" class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300"> Attribute Name <span class="text-red-500">*</span> </label>
        <InputText id="typeName" v-model="formData.name" placeholder="Enter Attribute name" class="w-full" :invalid="submitted && !formData.name" />
        <small v-if="submitted && !formData.name" class="text-red-500">Attribute Name is required</small>
      </div>

      <!-- Type Status -->
      <div class="mb-8">
        <label class="mb-3 block text-sm font-medium text-surface-700 dark:text-surface-300"> Attribute Status <span class="text-red-500">*</span> </label>
        <div class="flex gap-6">
          <div class="flex items-center">
            <RadioButton inputId="active" name="status" value="active" v-model="formData.status" />
            <label for="active" class="ml-2 text-sm">Active</label>
          </div>
          <div class="flex items-center">
            <RadioButton inputId="inactive" name="status" value="inactive" v-model="formData.status" />
            <label for="inactive" class="ml-2 text-sm">Inactive</label>
          </div>
        </div>
        <small v-if="submitted && !formData.status" class="text-red-500">Attribute Status is required</small>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="closeDialog" outlined />
        <Button type="submit" label="Submit" :loading="isSubmitting" severity="primary" class="!border-blue-500 !bg-blue-500 hover:!border-blue-600 hover:!bg-blue-600" />
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import { useList } from './useList'
import { useDevice } from '@/utils/device'

const {
  dt,
  lazyParams,
  totalRecords,
  records,
  isLoading,
  search,
  actionItems,
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
  editAttribute
} = useList()
const { isMobile } = useDevice()
</script>

<style lang="scss" scoped></style>
