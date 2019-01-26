<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>HTTP USSD Activator</v-toolbar-title>
    </v-toolbar>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <div class="toppadding">
          <ApolloQuery :query="require('../graphql/allproject.gql')">
            <template slot-scope="{ result: { data, loading, error } }">
              <div v-if="loading" class="loading">Loading...</div>
              <div v-else-if="data">
                <v-data-table :headers="headers" :items="data.getprojects" class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.sid }}</td>
                    <td>{{ props.item.friendlyName }}</td>
                    <td>{{ props.item.shortcode }}</td>
                    <td>{{ props.item.dateCreated }}</td>
                    <td>{{ props.item.dateUpdated }}</td>
                    <td class="justify-center layout px-0">
                      <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                      <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                    </td>
                  </template>
                </v-data-table>
              </div>
              <!-- Error -->
              <div v-else-if="error" class="error apollo">An error occured.
                <br>
                <h4>Details</h4>
                <br>
                {{error}}
              </div>
            </template>
          </ApolloQuery>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template> 

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "Application ID",
        align: "left",
        value: "sid"
      },
      { text: "Name", value: "friendlyName", align: "left" },
      { text: "Short Code", value: "shortcode", align: "left" },
      { text: "dateCreated", value: "dateCreated", align: "left" },
      { text: "dateUpdated", value: "dateUpdated", align: "left" },
      { text: "Actions", value: "name", sortable: false }
    ]
  }),
  methods: {
    editItem: item => {
      console.log(item); // eslint-disable-line
      console.log(process.env.VUE_APP_GRAPHQL_HTTP); // eslint-disable-line
    },
    deleteItem: item => {
      console.log(item); // eslint-disable-line
    }
  }
};
</script>

<style>
.toppadding {
  padding-top: 30px;
}
</style>
