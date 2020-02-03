({
    onInit: function(component, event, helper){
        helper.getPhotos(component);
    },
    setNewMainPhoto: function(component, event, helper){
        helper.setPhoto(component, event);
    }
})