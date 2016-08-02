define([
    "dojo/_base/declare",
    "dojo/store/Memory",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/tree",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetBase",
    "dojo/text!./templates/CheckBoxList.html"
], function(
    declare, Memory, Grid, Selection, selector, Tree, TemplatedMixin, WidgetBase, template
){

    return declare("bijit.form.CheckBoxList", [WidgetBase, TemplatedMixin], {

        baseClass : "cbl",
        templateString : template,

        store : null,
        allowSelectAll : true,
        labelField : "label",
        title : "",
        label : "",
        baseQuery : null,

        postCreate : function(){
            if (!this.store){
                // OnDemandGrid requires a store, so default it to a Memory if not provided.
                this.store = new Memory();
            }
            if (!this.baseQuery){
                this.baseQuery = {};
            }
            this._buildGrid();
            this.inherited(arguments);
        },

        _buildGrid : function(){
            this.grid = new (declare([Grid, Selection, Tree]))({
                selectionMode : "none",
                allowSelectAll : this.allowSelectAll,
                store : this.store,
                query : this.baseQuery,
                columns : this._buildColumns(),
                shouldExpand : function(item){
                    console.log(arguments);
                }
            }, this.gridNode);
        },

        _buildColumns : function(){
            return [
                selector({
                    label : "",
                    sortable : false
                }),
                {
                    field : this.labelField,
                    label : this.label
                }
            ];
        },

        _setTitleAttr : {
            node : "labelNode",
            type : "innerHTML"
        },

        _setupHandles : function(){
            this._handles.push(
                this.grid.on("dgrid-select", lang.hitch(this, this._didSelectItem))
            );
        },

        _didSelectItem : function(){
            console.log(arguments);
        },

        _getValueAttr : function(){
            var prop, selection = this.grid.selection, val = {
                all : this.grid.allSelected,
                include : [],
                exclude : []
            };
            if (val.all){
                // Flag any excludes
                for (prop in selection){
                    if (selection.hasOwnProperty(prop) && !selection[prop]){
                        val.exclude.push(prop);
                    }
                }
            } else {
                // Select-all not checked, flag includes
                for (prop in selection){
                    if (selection.hasOwnProperty(prop) && selection[prop]){
                        val.include.push(prop);
                    }
                }
            }
            return val;
        },

        destroy : function(){
            var i, len;

            if (this._handles){
                len = this._handles.length;
                for (i=0; i<len; i++){
                    this._handles[i].remove();
                }
            }

            if (this.grid){
                this.grid.destory();
            }

            this.inherited(arguments);
        }

    });

});