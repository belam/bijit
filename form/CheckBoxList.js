define([
    "dojo/_base/declare",
    "dgrid/Grid",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetBase",
    "dojo/text!./templates/CheckBoxList.html"
], function(
    declare, Grid, TemplatedMixin, WidgetBase, template
){

    return declare("bijit.form.CheckBoxList", [WidgetBase], {

        baseClass : "cbl",
        templateString : template,

        postCreate : function(){
            console.log(this.labelNode);
            this.inherited(arguments);
        },

        x_setLabelAttr : {
            node : "labelNode",
            type : "innerHTML"
        }

    });

});