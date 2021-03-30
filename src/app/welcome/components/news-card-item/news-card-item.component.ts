import { Component, Input, OnInit } from "@angular/core";
import { NewsModel } from "src/app/models/news.model";

@Component({
  selector: "app-news-card-item",
  templateUrl: "./news-card-item.component.html",
  styleUrls: ["./news-card-item.component.scss"],
})
export class NewsCardItemComponent implements OnInit {
  @Input() news: NewsModel;
  constructor() {}

  ngOnInit(): void {}
}
