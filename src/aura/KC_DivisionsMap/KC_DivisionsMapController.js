({
    displayPointers: function( component, event, helper ) {
        let mapMarkers = [],
        accounts = component.get('v.mapPointers');
        for ( var i = 0; i < accounts.length; i++ ) {
            var account = accounts[i];
            var marker = {
                'location': {
                    'Street': account.ShippingStreet,
                    'City': account.ShippingCity,
                    'PostalCode': account.ShippingPostalCode
                },
                'title': account.Name,
                'icon': 'standard:location'
            };
            mapMarkers.push( marker );
        }
        component.set( 'v.mapMarkers', mapMarkers );
    }
})