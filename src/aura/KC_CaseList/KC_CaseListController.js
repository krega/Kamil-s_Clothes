({
    doInit: function (component, event, helper) {
        helper.doInit(component);
    },

    showDetails: function (component, event, helper) {
    let index = event.currentTarget.dataset.index;
     component.set("v.showCaseDetails",true);
        let allOrders = component.get("v.userCases");
      component.set("v.selectedOrder", allOrders[index]);
      console.log(component.get("v.selectedOrder"));
    }
})