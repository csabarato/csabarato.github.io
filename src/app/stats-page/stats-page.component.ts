import {Component, OnInit} from '@angular/core';
import {FplStatsService} from "../service/fpl-stats-service";
import {DataTableModel} from "../model/data-table.model";
import {PickModel} from "../model/pick.model";
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit {

  // @ts-ignore
  responseData: DataTableModel;
  columns: string[] = ["Footballer", "2001683", "1000267", "9039879", "4525552", "1490914",
      "1703960", "2197016", "2120839", "8998775", "1703783"
  ];

  playerData: {[key: string]: string} = {
    "2001683" : "Ádi",
    "1000267" : "Balázs",
    "9039879" : "Csabi",
    "4525552" : "Dani",
    "1490914" : "Doni",
    "1703960" : "Fischer",
    "2197016" : "Krékó",
    "2120839" : "Mila",
    "8998775" : "Peti",
    "1703783" : "Tibi"
  }

  dataSource = new MatTableDataSource<PickModel[]>()
  nameFilter = new FormControl('');

  constructor(private fplStatsService: FplStatsService) {
  }

  ngOnInit(): void {
    this.fplStatsService.getDataTable()
      .subscribe((result) => {
        this.responseData = result
        this.dataSource.data = this.responseData.result_data
      })

    this.nameFilter.valueChanges.subscribe(
      name => {
        if (name == null) {
            this.dataSource = new MatTableDataSource<PickModel[]>(this.responseData.result_data)
            return;
        }

        let footballerIds = this.queryFootballerIdsByString(name);
        const filteredData = this.responseData.result_data.map((innerList) =>
          innerList.filter((item) => footballerIds.includes(item.footballer_id)))
            .filter((innerList) => innerList.length > 0);
        console.log(filteredData)

        this.dataSource = new MatTableDataSource<PickModel[]>(filteredData)
      }
    )
  }

  getFootballerNameById(footballerId: number) {
    return this.responseData.footballers[footballerId];
  }

  getPlayerNameById(playerId: string) {
    return this.playerData[playerId];
  }

  queryFootballerIdsByString(queryString: string) {
    let queriedIds: number[] = [];
    for (let footballer in this.responseData.footballers){
      if(this.responseData.footballers[footballer].toLowerCase().includes(queryString.toLowerCase())) {
          queriedIds.push(parseInt(footballer));
      }
    }
    return queriedIds;
  }

  getCellData(multiplier: number): string {
    switch (multiplier) {
        case 0: return "Kispad";
        case 1: return "Kezdő";
        case 2: return "Kapitány";
        default: return "";
    }
  }
}
