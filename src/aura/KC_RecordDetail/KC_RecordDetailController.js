({
   doInit : function (component,event,helper) {
            helper.prepareProductView(component);
           helper.getPrices(component);

  },
    selectPhoto: function(component, event, helper){
          helper.getPhoto(component, event, helper);
      },
   addToCart : function (component,event,helper) {
        helper.addNewItemToCard(component);
   },

});