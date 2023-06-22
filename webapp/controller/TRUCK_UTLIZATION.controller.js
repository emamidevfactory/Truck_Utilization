sap.ui.define([
	'sap/ui/core/library',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(coreLibrary, Controller, JSONModel) {
	"use strict";
	var ValueState = coreLibrary.ValueState;

	return Controller.extend("TRUCK_UTLIZATION.controller.TRUCK_UTLIZATION", {
		onInit: function() {
			this.sServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
			this.DefaultModeloModel = new sap.ui.model.odata.ODataModel(this.sServiceUrl, false);
			sap.ui.getCore().setModel(this.DefaultModeloModel, "defaultModel");
		},
		handleChange: function(oEvent) {
			var oValidatedComboBox = oEvent.getSource(),
				sSelectedKey = oValidatedComboBox.getSelectedKey(),
				sValue = oValidatedComboBox.getValue();

			if (!sSelectedKey && sValue) {
				oValidatedComboBox.setValueState(ValueState.Error);
				oValidatedComboBox.setValueStateText("Please enter a valid Truck Size!");
			} else {
				oValidatedComboBox.setValueState(ValueState.None);
			}
		},

		onLiveChange: function(oEvent) {
			var oValidatedInputbox = oEvent.getSource(),
				sSelectedKey = oValidatedInputbox.getSelectedKey(),
				sValue = oValidatedInputbox.getValue();

			if (!sValue && ' ') {
				oValidatedInputbox.setValueState(ValueState.Error);
				oValidatedInputbox.setValueStateText("Please enter a valid Shipment No!");
			} else {
				oValidatedInputbox.setValueState(ValueState.None);
			}
		},

		onGetDetails: function() {
			var doc_no = this.getView().byId("doc_no").getValue();
			var idComboBox = this.getView().byId("idComboBox").getValue();
			var myModel = sap.ui.getCore().getModel("defaultModel");
			myModel.setHeaders({
				"X-Requested-With": "X"
			});

			var filter_param1 = new sap.ui.model.Filter({
				path: "Tknum",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: doc_no
			});

			var filter_param2 = new sap.ui.model.Filter({
				path: "Bezei",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: idComboBox
			});

			var that = this;
			var readurl = "/ZUTLISED_PERCSet";
			myModel.read(readurl, {
				filters: [filter_param1, filter_param2],
				success: function(oData, oResponse) {
					var userdata = new sap.ui.model.json.JSONModel(oData);
					that.getView().byId("").setModel(userdata);

				},
				error: function(err) {

				}
			});

		}
	});
});