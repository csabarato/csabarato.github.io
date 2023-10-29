import {PickModel} from "./pick.model";

export interface DataTableModel {
  result_data: [PickModel[]];
  footballers: {[key: number]: string};
}
