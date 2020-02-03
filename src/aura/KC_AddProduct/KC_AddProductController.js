({
    onInit: function(component, event, helper){
        helper.getSizeOption(component);
        helper.setUserId(component);
        helper.getFamilyOption(component);
    },
    handleSizeChange: function(component, event, helper){
        helper.handleSize(component, event);
    },
    handleFamilyChange: function(component, event, helper){
            helper.familyChange(component, event);
        },
    handleUpload: function(component, event, helper){
        helper.getPhotos(component, event);
    },
    onSaveProduct: function(component, event, helper){
        helper.saveNewProduct(component);
    }
})