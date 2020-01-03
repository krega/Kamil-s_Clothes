({
    handleMyComponentEvent : function(component, event, helper){
        var divisionId = event.getParam("divisionId");
        component.set("v.divisionId",divisionId);
    },
    showUpsertAccount: function( component, event, helper ) {
        component.set("v.isUpsertDisplay", true);
        },

        openDeleteModal: function( component, event, helper ) {
        component.set("v.deleteIsOpen", true);
        },

        closeDeleteModal: function( component, event, helper ) {

         component.set("v.deleteIsOpen", false);

        },
})