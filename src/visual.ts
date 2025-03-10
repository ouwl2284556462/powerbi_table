/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import DataViewTable = powerbi.DataViewTable;
import IViewport = powerbi.IViewport;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewTableRow = powerbi.DataViewTableRow;
import IVisualHost = powerbi.extensibility.IVisualHost;
import * as d3 from "d3";
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;


export class Visual implements IVisual {
    private tableHeaderRow: Selection<HTMLElement>;
    private tableBody: Selection<HTMLElement>;
    private tableDiv: Selection<HTMLElement>;


    constructor(options: VisualConstructorOptions) {
        this.tableDiv = d3.select(options.element)
        .append("div")
        .classed("table-wrapper", true);

        const table = this.tableDiv.append('table');

        this.tableHeaderRow = table.append("thead")
                                    .append("tr");

        this.tableBody = table.append("tbody");
    }

    public update(options: VisualUpdateOptions) {
        const viewport: IViewport = options.viewport;
        const width: number = viewport.width - 15;
        const height: number = viewport.height - 10;
        this.tableDiv.style("width",  width + "px");
        this.tableDiv.style("height", height + "px");

        const dataViews: DataView[] = options.dataViews;    
        if (!dataViews) {
            console.log('dataViews is null.');
            return;
        }

        const dataView: DataView = dataViews[0];
        if (!dataView) {
            console.log('dataView is null.');
            return;    
        }

        const dataViewTable: DataViewTable = dataView.table;
        if (!dataViewTable) {
            console.log('dataViewTable is null.');
            return;    
        }



        this.setTableHeader(dataViewTable);
        this.setTableData(dataViewTable);
    }

    private setTableData(dataViewTable: DataViewTable) {
        const dataViewTableRow: DataViewTableRow[] = dataViewTable.rows
        this.tableBody.selectAll("tr")
        .data(dataViewTableRow)
        .join("tr")
        .selectAll("td")
        .data(d => d)
        .join("td")
        .text(d => d.toString());
    }

    private setTableHeader(dataViewTable: DataViewTable) {
        const columns: DataViewMetadataColumn[] = dataViewTable.columns;
        if (!columns || columns.length < 1) {
            console.log('columns is empty.');
            return 
        }

        this.tableHeaderRow.selectAll("th")
                           .data(columns)
                           .join("th")
                           .text(col => col.displayName);
    }

}