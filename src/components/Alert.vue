<template>
	<div>
		<b-alert show :variant="status | lowercase">
	    	<slot name="message"></slot>
	    </b-alert>
	</div>
</template>
<script>


export default {
	props : {
		status : String,
	},
	filters : {
		lowercase(value) {
			return value.toLowerCase();
		}
	}
}
</script>