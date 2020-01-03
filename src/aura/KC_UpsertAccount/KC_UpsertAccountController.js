({
 closeEditModal: function( component, event, helper ) {
      component.set("v.isUpsertDisplay", false);
       },

         onSuccess: function( component, event, helper ) {
         helper.onSuccess( component, event, helper);
         },

        onError: function( component, event, helper ) {
        helper.showToastError(component, event, helper);
        },
        onSubmit: function( component, event, helper ) {
          helper.onSubmit(component, event, helper);
        }

  })