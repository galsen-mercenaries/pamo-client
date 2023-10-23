import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { tap } from "rxjs/operators";
import { NewsService } from "src/app/services/news-service/news.service";

@Component({
  selector: "app-previsualize-avatar-popup",
  templateUrl: "./previsualize-avatar-popup.component.html",
  styleUrls: ["./previsualize-avatar-popup.component.scss"],
})
export class PrevisualizeAvatarPopupComponent implements OnInit {
  selectedImgUrl: string;
  uploading: boolean;
  constructor(
    public dialogRef: MatDialogRef<PrevisualizeAvatarPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.buildFileUrl();
  }

  buildFileUrl() {
    this.selectedImgUrl = URL.createObjectURL(this.data?.file);
    const file = this.data?.file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.selectedImgUrl = reader.result.toString();
    };
  }

  upload() {
    this.uploading = true;
    this.dialogRef.disableClose = true;
    console.log(this.data.file);
    const formData = new FormData();
    formData.append("file", this.data.file, this.data.file.name);
    this.newsService
      .uploadFile(formData)
      .pipe(
        tap((res) => {
          this.dialogRef.close();
        })
      )
      .subscribe();
  }

  cancel() {
    if (!this.uploading) {
      this.dialogRef.close();
    }
  }
}
