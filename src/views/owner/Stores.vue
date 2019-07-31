<template>
  <b-container class="mt-5">
    <b-table striped hover bordered :items="stores" :fields="fields"></b-table> 
  </b-container>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
    data() {
      return {
        stores : null,
        fields: [
          {
            key: 'name',
            label : 'Store name',
            sortable: false
          },
          {
            key: 'located_at',
            label : 'Located at',
            sortable: false
          },
          {
            key: 'created_at',
            label: 'Registered date',
            sortable: true,
          }
        ],
      };
    },
    created() {
      axios.get(`http://localhost:8000/owner/1/stores`)
          .then((res) => {
            const stores = res.data.stores;
            Object.keys(stores).forEach((key) => {
                stores[key].created_at = moment(stores[key]).format('dddd MMMM DD, YYYY');
            });
            this.stores = stores;
          });
    },
}
</script>