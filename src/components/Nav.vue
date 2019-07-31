<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark">
		    <b-navbar-brand><router-link to="/">MS</router-link></b-navbar-brand>

		    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		    <b-collapse id="nav-collapse" is-nav>
		      <b-navbar-nav>
		        <slot name="left-links"></slot>
		      </b-navbar-nav>

		      <!-- Right aligned nav items -->
		      <b-navbar-nav class="ml-auto">

		      	<b-navbar-nav right>
			        <slot name="right-links"></slot>
		      	</b-navbar-nav>

		      </b-navbar-nav>
		    </b-collapse>
  </b-navbar>
		<!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <a class="navbar-brand"><router-link to="/">MS</router-link></a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		
		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul class="navbar-nav mr-auto">
		      	<slot name="left-links"></slot>
		    </ul>
		    <form class="form-inline my-2 my-lg-0">
		    	<slot name="right-links"></slot>
		    </form>
		  </div>
		</nav> -->
	</div>
</template>

<script>
export default {
	
}
</script>