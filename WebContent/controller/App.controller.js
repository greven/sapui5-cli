sap.ui.controller('my.app.controller.App', {
  onInit: function() {
    if (sap.ui.Device.system.desktop) {
      this.getView().addStyleClass('sapUiSizeCompact');
    }
  }
});
