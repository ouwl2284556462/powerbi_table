import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
export declare class Visual implements IVisual {
    private tableHeaderRow;
    private tableBody;
    private tableDiv;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    private setTableData;
    private setTableHeader;
}
