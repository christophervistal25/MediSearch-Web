<template>
	<div :class="'alert alert-' + status | lowercase"  role="alert">
		<slot name="message"></slot>
	</div>
</template>
<script>
import axios from 'axios'
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