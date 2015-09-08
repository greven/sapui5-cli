jQuery.sap.declare('my.app.Component');
jQuery.sap.require('sap.m.routing.RouteMatchedHandler');

sap.ui.core.UIComponent.extend('my.app.Component', {

  metadata: {
    name: 'My SAPUI5 Demo App',
    version: '0.1',
    includes: ['css/styles.min.css'],
    dependencies: {
      libs: ['sap.m', 'sap.ui.layout'],
      components: []
    },

    config: {
      resourceBundle: 'i18n/i18n.properties',
      titleResource: 'xtit.shellTitle'
      // icon: "sap-icon://Fiori7/F1373",
      // favIcon: "icon/icon.ico",
      // serviceConfig: {
      //     name: "",
      //     serviceUrl: ""
      //     }
    },

    routing: {
      config: {
        viewType: 'XML',
        viewPath: 'my.app.view',
        targetAggregation: 'pages',
        targetControl: 'AppContainer',
        transition: 'slide',
        clearTarget: false
      },
      routes: [
        {
          pattern: '',
          name: 'Main',
          view: 'Main'
        }
      ]
    }
  },

  init: function() {
    sap.ui.core.UIComponent.prototype.init.apply(this);

    var mConfig = this.getMetadata().getConfig();
    var rootPath = jQuery.sap.getModulePath('my.app');

    // Set i18n model
    var i18nModel = new sap.ui.model.resource.ResourceModel({
      bundleUrl: [rootPath, mConfig.resourceBundle].join('/')
    });
    this.setModel(i18nModel, 'i18n');

    // Create and set domain model to the component
    // var sServiceUrl = mConfig.serviceConfig.serviceUrl;

    // Set the data model
    // var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
    //     json: true,
    //     defaultBindingMode: 'OneWay',
    //     useBatch: true,
    //     defaultCountMode: 'Inline',
    //     loadMetadataAsync: true
    // });
    // this.setModel(oModel);

    // The device model
    var oDeviceModel = new sap.ui.model.json.JSONModel({
      isDesktop: sap.ui.Device.system.desktop,
      isNoDesktop: !sap.ui.Device.system.desktop,
      isPhone: sap.ui.Device.system.phone,
      isNoPhone: !sap.ui.Device.system.phone,
      listMode: sap.ui.Device.system.phone ? 'None' : 'SingleSelectMaster',
      listItemType: sap.ui.Device.system.phone ? 'Active' : 'Inactive'
    });
    oDeviceModel.setDefaultBindingMode('OneWay');
    this.setModel(oDeviceModel, 'device');

    var oRouter = this.getRouter();
    this._routeMatchedHandler = new sap.m.routing.RouteMatchedHandler(oRouter);
    oRouter.initialize();
  },

  exit: function() {
    this._routeMatchedHandler.destroy();
  },

  // Initialize the application
  createContent: function() {
    var oViewData = {
      component: this
    };
    return sap.ui.view({
      viewName: 'my.app.view.App',
      type: sap.ui.core.mvc.ViewType.XML,
      viewData: oViewData
    });
  }
});
