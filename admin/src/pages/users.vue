<script setup>
import { useMessageStore, useUserStore } from '@/store'
import Edit from '@/components/Users/Edit.vue'
import Delete from '@/components/Users/Delete.vue'
import New from '@/components/Users/New.vue'

const userStore = useUserStore()
const messageStore = useMessageStore()

const data = computed(() => userStore.getUsers)
const editing = ref(false)
const creating = ref(false)
const user = ref({})

const edit = value => {
  user.value = { ...value }
  editing.value = true
}

const newUser = () => {
  creating.value = true
}

const headers = ref([
  { title: 'Id', key: '_id', align: ' d-none' },
  { title: 'Username', key: 'username' },
  { title: 'E-Mail', key: 'email' },
  { title: 'Roles', key: 'roles' },
  { title: 'isActive', key: 'isActive' },
  { title: 'Created Time', key: 'createdTime' },
  { title: 'Action', key: 'action', width: '180px' },
])
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VAlert
          v-if="messageStore.error"
          border="bottom"
          color="error"
          dark
          class="mb-4"
          v-html="messageStore.error"
        />
        <VAlert
          v-if="messageStore.isSuccess"
          border="bottom"
          color="success"
          dark
          class="text-center mb-4"
        >
          {{ messageStore.isSuccess }}
        </VAlert>
      </VCol>
    </VRow>
  </VContainer>

  <Edit
    v-if="editing"
    :editing="editing"
    :user="user"
    @updateEditing="val => (editing = val)"
  />

  <New
    v-if="creating"
    :creating="creating"
    @updateCreating="val => (creating = val)"
  />

  <VBtn
    @click="newUser()"
    v-if="!editing && !creating"
    >
    {{ "New User" }}
  </VBtn>
  <VSpacer style="height: 12px"/>
  <VDataTable
    v-if="!editing && !creating"
    items-per-page="10"
    :headers="headers"
    :items="data"
    item-value="name"
    class="elevation-1"
  >
    <template v-slot:item.isActive="{ value }">
      <VBtn
        :color="value === true ? 'success' : 'error'"
        disabled
      >
        {{ value ? 'Enabled' : 'Disabled' }}
      </VBtn>
    </template>
    <template v-slot:item.roles="{ value }">
      {{ value.map(role => role.name).join(', ') }}
    </template>
    <template v-slot:item.action="{ item }">
      <VBtn
        @click="edit(item)"
        class="mr-2"
      >
        <VIcon icon="mdi-pencil" />
      </VBtn>

      <Delete
        :user="user"
        @click="user = item"
      />
    </template>
    <template v-slot:item.createdTime="{ value }">
      <span v-if="value">{{ value.substring(0, 16).replace('T', ', 	') }}</span>
    </template>
  </VDataTable>
</template>
