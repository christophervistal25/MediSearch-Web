<template>
	<div>
		<b-container class="mt-5">
			<Alert :status="status" v-show="!spinner">
			<template v-slot:message>
				{{ message }}
			</template>
		</Alert>
			<form @submit.prevent="addNewStore" autocomplete="off">
				  <b-row class="my-1">
				  		<b-col sm="6">
					  		<b-form-group id="fieldset-1" description="Name of your store atleast 4 characters." label="Enter name : " label-for="input-1">
						      	<b-form-input id="input-1" v-model="store.name" :state="store.name.length >= 4" trim required :disabled="spinner"></b-form-input>
						    </b-form-group>
				  		</b-col>
				  		<b-col sm="6">
				  			<b-form-group id="fieldset-2" description="Address of your store atleast 10 characters." label="Enter address : " label-for="input-2">
						        <b-form-textarea id="input-2" rows="3" v-model="store.located_at" :state="store.located_at.length >= 10" :disabled="spinner"></b-form-textarea>
						    </b-form-group>
				  		</b-col>
				  </b-row>

				<div class="text-right">
					<b-button variant="primary" pill type="submit" :disabled="spinner">
						<b-spinner  v-show="spinner" small type="grow"></b-spinner>
						{{ spinner ? 'Creating...' : 'Add Store' }}
					</b-button> 
				</div>
			</form>
		</b-container>
	</div>
</template>
<script>
import axios from 'axios'
import FormValidator from '../../class/FormValidator'
import Alert from '../../components/Alert.vue'

  export default {
  	data() {
      return {
        store : {
        	name: '',
        	located_at : '',
        },
        validator : null,
        spinner : false,
        status : 'info',
        message : 'Register your store just fill in all fields'
      }
    },
    methods : {
    	addNewStore() {
			this.validator = new FormValidator(this.store,{
				name 	: 'required|min:4',
				located_at : 'required|min:10',
			});

			this.validator.success(() => {
				this.spinner = true;
				// For temporary we just use the owner with the id of 1.
				axios.post(`http://localhost:8000/owner/1/store`, this.store)
					.then((res) => {
						const response = res.data;
						if ( response.created ) {
							this.message          = 'Successfully register.';
							this.status           = 'success';
							this.store.name       = '';
							this.store.located_at = '';
							this.spinner          = false;
						}
					});
			});
    	}
    },
    components : {
		Alert,
 	}
  }

</script>