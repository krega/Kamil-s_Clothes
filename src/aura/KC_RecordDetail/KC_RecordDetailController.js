({
   doInit : function (component,event,helper) {
            helper.getView(component);
           helper.getPrices(component);
           helper.getOldPrice(component);

  },
    selectPhoto: function(component, event, helper){
          helper.getPhoto(component, event, helper);
      },
   addToCart : function (component,event,helper) {
        helper.addNewItemToCard(component);
   },
     addToFavorites: function(component, event, helper){
           helper.favorites(component);
       },

});