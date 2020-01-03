({
    onSearch: function (component, event, helper){
         helper.search(component);
    },

    displayDetails: function(component, event, helper){
      helper.display(component, event);
    },

    setSelectedRecord: function(component, event, handler){
      let index = component.get("v.index"),
      listResult = component.get("v.resultList");
      component.set("v.selectedRecord", listResult[index]);
      component.set("v.mapPointers", listResult[index]);
    },

    clear: function(component, event, helper){
     component.set('v.searchItemName', '');
     component.set('v.searchItemCountry', '');
     component.set('v.searchItemCity', '');
     },

      deleteRecord: function(component, event, helper){
       helper.onDelete(component, event, helper);
      },

      handleComponentEvent: function(component, event, helper){
        helper.handleUpdateEvent(component, event, helper);
      }
})