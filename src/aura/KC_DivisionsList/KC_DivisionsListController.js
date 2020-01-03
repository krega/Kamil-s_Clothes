
({
    setDivisionId: function(component, event, helper){
        var divisionId = event.currentTarget.dataset.id;
        component.set("v.index", divisionId);
        var arr = component.find("resultItem");
        for(let i = 0; i < arr.length; i++){
            var itemId = arr[i].getElement().getAttribute("data-id");
            if(itemId !== divisionId){
                $A.util.removeClass(arr[i], "selectedRow");
            }else {
                $A.util.addClass(arr[i], "selectedRow");
            }
        }
    }
})
