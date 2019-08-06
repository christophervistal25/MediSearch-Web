<template>
  <div>
          <b-container class="mt-5">
          <b-table id="stores-table" striped hover bordered :items="stores" :fields="fields" :busy="isBusy"  :per-page="perPage"
            :current-page="currentPage">
              <div slot="table-busy" class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong> &nbsp;Loading...</strong>
              </div>
              <template slot="actions" slot-scope="row">
                <b-button size="sm" :variant="row.item.pharmacists.length !== 0 ? 'success' : 'primary' " class="align-middle" @click="assignPharmacist(row.item, row.index, $event.target)"> {{ row.item.pharmacists.length !== 0 ? 'Edit Pharmacists' : 'Assign Pharmacists' }} </b-button>
              </template>
          </b-table> 
            <div>
               <h6 class="text-right">Page : {{ currentPage }} of {{ rows / perPage | up }}</h6>
               <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="stores-table" align="right"></b-pagination>
            </div>
        </b-container>

         <!-- Assign Pharmacists modal -->
          <b-modal size="xl" :id="infoModal.id" :title="infoModal.title" ok-only >
              <b-row class="my-1">
                  <b-col sm="12">
                    <b-form-group id="fieldset-2" class="font-weight-bold"  label="Store address : " label-for="input-2">
                        <b-form-textarea id="input-2" rows="3" v-model="infoModal.content.located_at" readonly></b-form-textarea>
                    </b-form-group>
                  </b-col>
              </b-row>
              <h6 class="text-info font-weight-bold">{{ pharmacistListTitle }}</h6>
              <div v-if="pharmacists.length != 0">
                  <b-table striped hover bordered  responsive="sm" :items="pharmacists" :fields="pharmacistsFields">
                    <template slot="actions" slot-scope="row">
                      <b-button size="sm" variant="danger" class="align-middle" @click="showMoveConfirmation(row.item)">Move</b-button>
                    </template>
                  </b-table>
              </div>
              <div v-else>
                  <h6 class="text-center">No data available for {{ pharmacistListTitle | lowercase }}</h6>
              </div>

                <div class="text-right">
                     <div>
                      <b-button-group size="sm">
                        <b-button variant="info" @click="pharmacistOfStore">Pharmacist List</b-button>
                        <b-button @click="pharmacistListFromOtherStore">Get from other store</b-button>
                        <b-button variant="success" v-b-modal.modal-multi-3>Add Pharmacist</b-button>
                      </b-button-group>
                    </div>
                </div>
          </b-modal>

          <b-modal id="modal-multi-3" size="l" title="Add pharmacist">
            <form @submit.prevent="submitNewPharmacist" autocomplete="off">
              <b-row class="my-1">

                  <b-col sm="12">
                    <b-form-group id="fieldset-1" class="font-weight-bold"  label="Pharmacist fullname : " label-for="input-1">
                        <b-form-input id="input-1" type="text" v-model="pharmacist.fullname" trim required></b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col sm="12">
                     <b-form-group id="fieldset-2" class="font-weight-bold"  label="Pharmacist email : " label-for="input-2">
                        <b-form-input id="input-2" type="email" v-model="pharmacist.email" trim required></b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col sm="12">
                     <b-form-group id="fieldset-3" class="font-weight-bold"  label="Pharmacist Contact no : " label-for="input-3">
                        <b-form-input id="input-3" type="text" v-model="pharmacist.contact_no" trim required></b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col sm="12">
                    <b-form-group id="fieldset-4" class="font-weight-bold"  label="Pharmacist address : " label-for="input-4">
                        <b-form-textarea id="input-4" rows="3" v-model="pharmacist.address" trim required></b-form-textarea>
                    </b-form-group>
                 </b-col>
              </b-row>
            </form>
            <template slot="modal-footer" slot-scope="{ add }">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="default" variant="success" @click="submitNewPharmacist">
                  Add Pharmacist
                </b-button>
              </template>
          </b-modal>

  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
    data() {
      return {
        stores : [],
        isBusy : true,
        rows : 0,
        perPage: 5,
        currentPage: 1,
        infoModal: { id: 'info-modal', title: '', content: '' },
        pharmacistsFields: ['fullname', 'address', 'email', 'contact_no'],
        pharmacistListTitle : 'Pharmacists',
        pharmacists: [],
        pharmacist : { fullname : null, email : null, contact_no : null, address : null},
        fields: [ { key: 'name', label : 'Store name', sortable: false },
                  { key: 'located_at', label : 'Located at', sortable: false },
                  { key: 'created_at', label: 'Registered date', sortable: true },
                  { key: 'actions', label: 'Actions', } ],
      };
    },
    created() {
      axios.get(`http://localhost:8000/owner/1/stores`)
          .then((res) => {
            const stores = res.data.stores;
            Object.keys(stores).forEach((key) => {
                stores[key].created_at = moment(stores[key]).format('dddd MMMM DD, YYYY');
            });
            this.isBusy = false;
            this.stores = stores;
            this.rows = stores.length;
          });
    },
    filters : {
      up(value) {
        return Math.ceil(value);
      },
      lowercase(value) {
        return value.toLowerCase();
      }
  },
  methods : {
      assignPharmacist(store, index, button) {
          // rebase to default the pharmacists fields
          this.pharmacistsFields = ['fullname', 'address', 'email', 'contact_no'];
          this.pharmacistListTitle  = 'Pharmacists';
          this.infoModal.title      = `Assign pharmacist in ${store.name}`;
          this.infoModal.content    = store;
          this.pharmacists          = store.pharmacists;
          this.$root.$emit('bv::show::modal', this.infoModal.id, button);
      },
      pharmacistListFromOtherStore() {
        this.pharmacists = [];
        let currentStoreId = this.infoModal.content.pivot.store_id;
        this.pharmacistListTitle = 'Pharmacist from other stores';
        this.pharmacistsFields.push('store', 'located_at', 'actions');
        this.stores.map((data, key) => {
            if ( data.id != currentStoreId) {
                this.stores[key].pharmacists.map((data) => {
                    data['store']      = this.stores[key].name;
                    data['located_at'] = this.stores[key].located_at;
                    this.pharmacists.push(data);
                });
            }
        });
      },
      pharmacistOfStore() {
        this.pharmacistsFields = ['fullname', 'address', 'email', 'contact_no'];
        this.pharmacists = [];
        let currentStoreId = this.infoModal.content.pivot.store_id;
        this.pharmacistListTitle = 'Pharmacists';
        this.stores.map((data, key) => {
            if ( data.id == currentStoreId) {
                this.stores[key].pharmacists.map((data) => {
                    data['store']      = this.stores[key].name;
                    data['located_at'] = this.stores[key].located_at;
                    this.pharmacists.push(data);
                });
            }
        });
      },
      submitNewPharmacist() {
        const storeId = this.infoModal.content.pivot.store_id;
        const ownerId = this.infoModal.content.pivot.owner_id;
         axios.post(`http://localhost:8000/owner/${ownerId}/store/${storeId}`, this.pharmacist)
          .then((res) => {
            // Push the new data before rebasing.
            this.stores.map((data) => {
              if (data.id == storeId) {
                  data.pharmacists.push(res.data);
                  this.pharmacistOfStore();
              }
            });
            this.pharmacist.fullname   = null;
            this.pharmacist.email      = null;
            this.pharmacist.contact_no = null;
            this.pharmacist.address    = null;
          });
      },
      showMoveConfirmation(data) {
          let confirmation = confirm('Please confirm that you want to move this pharmacist to this store.');
          let storeId = this.infoModal.content.pivot.store_id;
          if ( confirmation ) {
            axios.put(`http://localhost:8000/owner/store/pharmacist/${storeId}`, {id:data.id})
                .then((res) => {
                  // delete from the store.
                  this.stores.map((store,key) => {

                      if (store.id == data.store_id) {
                        this.stores[key].pharmacists = store.pharmacists.filter((pharmacist) => pharmacist.id != data.id);
                        this.pharmacistListFromOtherStore();
                      }

                      if (storeId == store.id) {
                          store.pharmacists.push(res.data);
                      }
                  });
                });
          }
          
      }
  },
}
</script>

<style lang="css">
  #info-modal___BV_modal_backdrop_,#modal-multi-3___BV_modal_backdrop_{
    background :#00000029;
  }
</style>