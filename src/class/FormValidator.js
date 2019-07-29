export default class FormValidator
{
	constructor(formFields, rules) {
		this.message            = [];
		this.fieldWithManyRule = {};
		this.fieldWithOneRule  = {};
		this.formFields        = formFields;
		this.rules             = rules;
		this.validate();

		return this;
	}

	validate() {
		let ruleName = '';
		this.fieldSeperator();
		this.examine(this.fieldWithManyRule);
		this.examine(this.fieldWithOneRule);
	}

	examine(fieldWithRule) {
		for( const field of Object.keys(fieldWithRule) ) {
			for( const rule of this.rules[field].split('|') ) {
				  if( this.isRuleHasArgument(rule) ) {
				  	let [method, argument] = rule.split(':');
				  		this[method](field, argument);
				  } else {
				  		this[rule](field);
				  }
			}
		}
	}

	fieldSeperator() {
		Object.values(this.rules).map((data, index) => {
			let fieldKey = Object.keys(this.rules)[index];
			if ( data.includes('|') ) {
				this.fieldWithManyRule[fieldKey] = data;
			} else {
				this.fieldWithOneRule[fieldKey] = data;
			}
		});
	}

	// Extract this to it's own Class
	isRuleHasArgument(rule) {
		return rule.includes(':');
	}


	required(field) {
		if ( !this.formFields[field] ) {
			this.message.push({
				[field] : `${field} field is required`,
			});	
		}
	}

	min(field, ruleValue) {
		if ( !(this.formFields[field] != null && this.formFields[field].length >= ruleValue) ) {
			this.message.push({
				[field] : `${field} must be minimum of ${ruleValue}`,
			});		
		}
	}

	max(field, ruleValue) {
		if ( !(this.formFields[field] != null && this.formFields[field].length <= ruleValue) ) {
			this.message.push({
				[field] : `${field} must be maximum of ${ruleValue}`,
			});		
		}
	}

	match(field, ruleValue) {
		if ( !(this.formFields[field] === this.formFields[ruleValue]) ) {
			this.message.push({
				[field] : `${field} must be match with ${ruleValue}`,
			});		
		}
	}

	strict(field) {
		
	}

	success(callback) {
		if (this.message.length == 0) {
			callback();
		}
	}
}