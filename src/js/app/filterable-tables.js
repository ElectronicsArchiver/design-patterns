/*

---
title: Filterable Table Module
name: filterable-table-module
category: Javascript
---

*/

define( [ 'app/utils' ] , function( UTILS )
{
	// --------------------------------------------------

	var FILTERABLE = function( settings )
	{
		// Abandon if no table element supplied
		if( !settings.$table ) return false;

		// Keyboard input debounce delay
		this.debounce_delay = 200;
		
		// Assign our table element
		this.$table = settings.$table;

		// Set a unique id for the <table>
		this.$table.id = 'filterable_table_' + Date.now();
		
		// We'll keep our active filters here
		this.filters = {};
		
		// Load up our filterable fields
		this.fields = this.read_fields();
		
		// Retrieve data from the table
		this.data = this.read_data();

		// console.log( 'Fields: ------------------------- ' , this.fields );
		// console.log( 'Data: ------------------------- ' , this.data );

		// Let AT know that the table could change
		this.$table.setAttribute( 'aria-live' , 'polite' );

		// Create/insert the filter form
		this.$form = this.render_form();
		
		// No results placeholder
		this.$no_results = document.createElement( 'div' );
		this.$no_results.innerHTML = '<p><i>Sorry, there are no results matching your filters.</i></p>';

		return this.$table;
	};

	// --------------------------------------------------
	// Load the filterable table data

	FILTERABLE.prototype.read_data = function()
	{
		// Returnable
		var data = [];

		var $rows = this.$table.querySelectorAll( 'tbody > tr' );

		// Process each row
		for( r = 0 ; r < $rows.length ; r ++ )
		{
			var $cells = $rows[ r ].querySelectorAll( 'td' );
			
			var row_data = {};
			
			// Process each cell
			for( c = 0 ; c < $cells.length ; c ++ )
			{
				// Skip if not a filterable field index
				if( typeof( this.fields[ c ] ) !== 'object' ) continue;
				
				// Get the this field's column index
				var column_index = this.fields[ c ].id;
				
				// Look up the right table cell
				var $cell = $cells[ column_index ];
				
				// Get data-value attribute; fall back to cell content
				var raw_value = $cell.getAttribute( 'data-value' ) ? $cell.getAttribute( 'data-value' ) : $cell.innerHTML;

				// Split into multiple values or an empty array
				var values = raw_value != '' ? raw_value.split( '|' ) : [];
				
				row_data[ column_index ] = values;
			}
			
			data.push(
			{
				$row: $rows[ r ],
				values: row_data,
			}); 
		}
		
		return data;
	};
	
	// --------------------------------------------------
	// Load up fields from table headings

	FILTERABLE.prototype.read_fields = function()
	{
		// Get the first bunch of <th> elements we find
		var $header_cells = this.$table.querySelectorAll( 'thead > tr > th' );

		// Returnable
		var fields = [];
		
		// Process each <th>
		for( i = 0 ; i < $header_cells.length ; i ++ )
		{
			// console.log( 'Header: ------------------------- ' , $header_cells[ i ] );

			var $header_cell = $header_cells[ i ];
			
			// Skip if this is not a filterable column
			if( !$header_cell.matches( '[ data-filterable ]' ) ) continue;

			// Data cells in this column will have a matching index
			fields.push(
			{
				id: i,
				$header: $header_cell,

				// Get a name if supplied, fall back to HTML content
				name: $header_cell.getAttribute( 'data-name' ) ? $header_cell.getAttribute( 'data-name' ) : $header_cell.innerHTML,

				// The type of filter control: [text|select]
				type: $header_cell.getAttribute( 'data-type' ),

				// Modifier for the input: [default|large|small]
				modifier: $header_cell.getAttribute( 'data-modifier' ) ? $header_cell.getAttribute( 'data-modifier' ) : 'default',
			});
		}
		
		return fields;
	};
	
	// --------------------------------------------------

	FILTERABLE.prototype.render_form = function()
	{
		// The form itself
		var $form = document.createElement( 'form' );
		$form.setAttribute( 'class' , 'c-form' );
		$form.setAttribute( 'action' , '#'+this.$table.id );
		$form.setAttribute( 'method' , 'get' );
	
		// Field wrapper
		var $fieldset = document.createElement( 'fieldset' );
		$fieldset.setAttribute( 'class' , 'fieldset_inline' );
		$form.appendChild( $fieldset );
	
		// Fieldset text label
		var $legend = document.createElement( 'legend' );
		$legend.setAttribute( 'class' , 'sr-only' );
		$legend.innerHTML = 'Filters';
		$fieldset.appendChild( $legend );
	
		// Individual controls
		for( var i = 0 ; i < this.fields.length ; i ++ )
		{
			var control_id = this.$table.id + '__' + i;
			var unique_values = this.unique_values( this.fields[ i ] );

			// If we only have a single value then don't bother
			if( unique_values.length < 2 )
			{
				continue;
			}
			
			// Control wrapper
			var $control = document.createElement( 'div' );
			$control.setAttribute( 'class' , 'c-form__element fieldset_item--' + this.fields[ i ].modifier + '' );
			$control.setAttribute( 'data-fieldindex' , i );
			$fieldset.appendChild( $control );
			
			// Label
			var $label = document.createElement( 'label' );
			$label.setAttribute( 'class' , 'c-form__label' );
			$label.setAttribute( 'for' , control_id );
			$label.innerHTML = this.fields[ i ].name;
			$control.appendChild( $label );

			switch( this.fields[ i ].type )
			{
				case 'select' :
					
					// Select wrapper
					var $select_wrapper = document.createElement( 'div' );
					$select_wrapper.setAttribute( 'class' , 'c-form__input c-form__input--select' );
					$control.appendChild( $select_wrapper );
					
					// Select itself
					var $select = document.createElement( 'select' );
					$select.setAttribute( 'id' , control_id );
					$select.setAttribute( 'class' , 'c-form__select' );
					$select_wrapper.appendChild( $select );
					
					// Add in the default option
					var $default_option = document.createElement( 'option' );
					$default_option.setAttribute( 'value' , '' );
					$default_option.innerHTML = 'Any';
					$select.appendChild( $default_option );

					// console.log( 'Rendering field: ------------------------- ' , this.fields[ i ] );

					// Add in the other options
					for( var o = 0 ; o < unique_values.length ; o ++ )
					{
						var $option = document.createElement( 'option' );
						$option.setAttribute( 'value' , unique_values[ o ] );
						$option.innerHTML = unique_values[ o ];
						$select.appendChild( $option );
					}
				
					// Add an event listener to refresh the table when this is changed
					$select.addEventListener( 'change' , this.input_change_handler( $control ).bind( this ) );
					
				break;

				default : // text
					
					// Input itself
					var $input = document.createElement( 'input' );
					$input.setAttribute( 'id' , control_id );
					$input.setAttribute( 'class' , 'c-form__input c-form__input--text' );
					$input.setAttribute( 'type' , 'text' );
					$control.appendChild( $input );
					
					// Add event listeners to refresh the table when this is changed
					$input.addEventListener( 'keyup' , this.input_change_handler( $control ).bind( this ) );
					$input.addEventListener( 'change' , this.input_change_handler( $control ).bind( this ) );

				break;
			}

		}
		
		// Add a submit button
		var $footer = document.createElement( 'div' );
		$footer.setAttribute( 'class' , 'c-form__element is-hidden' );
		$fieldset.appendChild( $footer );

		var $button = document.createElement( 'button' );
		$button.setAttribute( 'class' , '' );
		$button.setAttribute( 'type' , 'submit' );
		$button.innerHTML = "Submit";
		$footer.appendChild( $button );
		
		// Add an event listener to make sure the form isn't actually submitted if clicked
		$button.addEventListener( 'click' , function( e ){ e.preventDefault(); } );

		// Find out where to inject the form
		var $parent = this.$table.parentNode;
		var $before = this.$table;
		
		// If the parent is a wrapper for the table use its parent instead
		if( $parent.matches( '.c-table-scrollingwrapper' ) )
		{
			$before = $parent;
			$parent = $parent.parentNode;
		}

		// Inject our form
		$parent.insertBefore( $form , $before );
	};

	// --------------------------------------------------
	
	FILTERABLE.prototype.update = function( $control )
	{
		// Update filter state

		var field_index = $control.getAttribute( 'data-fieldindex' );

		// Get the filter value from the control

		var value = false;

		switch( this.fields[ field_index ].type )
		{
			case 'select' :
				value = $control.querySelector( '.c-form__select' ).value;
			break;

			default : // text
				value = $control.querySelector( '.c-form__input--text' ).value;
			break;
		}		

		// Add/override or remove the value to filter
		if( typeof value != 'undefined' && value != '' )
		{
			this.filters[ field_index ] = value;
		}
		else
		{
			delete this.filters[ field_index ];
		}

		// console.log( 'Filters: ------------------------- ' , this.filters );

		// Keep a tally of how many rows are hidden
		var hidden_tally = 0;
		
		// Check each data row
		for( var r = 0 ; r < this.data.length ; r ++ )
		{
			var row = this.data[ r ];

			// Defaults to true, if any of the filters don't match we'll set it to false
			var row_matches = true;
			
			// Apply each filter in turn
			var filter_keys = this.filters ? Object.keys( this.filters ) : {};

			for( var f = 0 ; f < filter_keys.length ; f ++ )
			{
				// Clean up some key variables
				var filter_value = this.filters[ filter_keys[ f ] ].toLowerCase().trim();
				var field = this.fields[ filter_keys[ f ] ];
				var field_values = row.values[ field.id ];

				// Default to false, we'll set it to true if any of the filters match
				var filter_matches = false;

				// Check the filter against each value for the row
				for( var v = 0 ; v < field_values.length ; v ++ )
				{
					var field_value = field_values[ v ].toLowerCase().trim();
					
					switch( field.type )
					{
						case 'select' :

							if( field_value == filter_value )
							{
								filter_matches = true;
							}
							
							break;
							
						default : // text
						
							// Split into separate filter terms
							var filter_values = filter_value.split( ' ' );

							// All terms must match: assume true then check each term and...
							filter_matches = true;
							for( var i = 0 ; i < filter_values.length ; i ++ )
							{
								// ...switch to false if any don't
								filter_matches *= ( field_value.indexOf( filter_values[ i ] ) != -1 );
							}

						break;
					}
				}
				
				// If none of our filters matched this will set row_matches to false
				row_matches *= filter_matches;
			}

			// Hide/unhide the row
			if( row_matches )
			{
				row.$row.removeAttribute( 'hidden' );
			}
			else
			{
				row.$row.setAttribute( 'hidden' , true );
				hidden_tally++;
			}
		}
		
		// Check for empty status
		if( hidden_tally == this.data.length )
		{
			if( !this.$no_results.parentNode )
			{
				this.$table.parentNode.insertBefore( this.$no_results , this.$table.nextSibling );
			}
		}
		else
		{
			if( this.$no_results.parentNode )
			{
				this.$table.parentNode.removeChild( this.$no_results );
			}
		}

		// Flash on update
		if( typeof this.$table.classList != 'undefined' )
		{
			this.$table.classList.remove( 'u-flashin' );
			
			// Delay update by 2xRAF to ensure that the keyframe animation kicks in
			var $table = this.$table;
			requestAnimationFrame( function(){ requestAnimationFrame( function(){
				$table.classList.add( 'u-flashin' );
			} ); } );
		}

	};

	// --------------------------------------------------
	
	FILTERABLE.prototype.input_change_handler = function( $control )
	{
		// Abort if no control element is provided
		if( $control == undefined ) return false;
		
		// Debounce this so it doesn't fire while typing fast
		return UTILS.debounce( function( e )
		{
			this.update( $control );
		} , this.debounce_delay );
	};

	// --------------------------------------------------
	
	FILTERABLE.prototype.unique_values = function( field )
	{
		var unique_values = [];
			
		// Go over each row
		for( var r = 0 ; r < this.data.length ; r ++ )
		{
			// Grab the values for this row
			var row_values = this.data[ r ].values[ field.id ];

			// Check each value
			for( var v = 0 ; v < row_values.length ; v ++ )
			{
				var row_value = row_values[ v ];

				// Add the value if it's not already in our list of values
				if( unique_values.indexOf( row_value ) == -1 )
				{
					unique_values.push( row_value );
				}
			}
		}
		
		unique_values.sort();

		// console.log( 'Unique values: ------------------------- ' , unique_values );
		
		return unique_values;
	};

	// --------------------------------------------------
	
	return FILTERABLE;

});
