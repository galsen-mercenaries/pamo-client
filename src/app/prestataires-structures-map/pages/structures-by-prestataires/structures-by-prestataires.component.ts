import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as mapboxgl from "mapbox-gl";
import { switchMap, tap } from "rxjs/operators";
import { PrestataireModel } from "src/app/models/prestataire.model";
import { StructureSanitaireModel } from "src/app/models/structure-sanitaire.model";
import { NewsService } from "src/app/services/news-service/news.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-structures-by-prestataires",
  templateUrl: "./structures-by-prestataires.component.html",
  styleUrls: ["./structures-by-prestataires.component.scss"],
})
export class StructuresByPrestatairesComponent
  implements OnInit, AfterViewInit
{
  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/streets-v11";
  lat = 14.773161;
  lng = -17.392923;
  prestataire: PrestataireModel;
  prestatairesSuggestions: PrestataireModel[];
  prestataires: PrestataireModel[];
  filteredStructures: StructureSanitaireModel[];
  structures: StructureSanitaireModel[];
  isMapDisplay: boolean = true;
  lightMod: boolean;
  markers: any[] = [];
  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit() {
    this.prestataire = history?.state?.prestataire;
    this.lightMod = this.router.url === "/prestataire";
  }

  ngAfterViewInit() {
    if (this.prestataire) {
      this.onPrestataireSelected({});
    }
    this.initMap();
    this.getPrestatairesAndStructures();
  }

  goBack() {
    this.router.navigate(["/"]);
  }

  getPrestatairesAndStructures() {
    this.newsService
      .getAllPrestataires()
      .pipe(
        tap((prestataires) => {
          this.prestataires = prestataires;
        })
      )
      .subscribe();
  }

  initMap() {
    const accessToken = environment.MAPBOX_API_KEY;
    this.map = new mapboxgl.Map({
      accessToken,
      container: "map",
      style: this.style,
      zoom: 12,
      center: [this.lng, this.lat],
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  addMarker(structure: StructureSanitaireModel) {
    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([structure.longitude, structure.latitude])
      .setPopup(
        new mapboxgl.Popup() // add popups
          .setHTML(
            "<h6>" +
              structure.nom +
              "</h6><p>ville: " +
              structure.ville +
              "</p>"
          )
      )
      .addTo(this.map);
    return marker;
  }

  displayMap(display) {
    this.isMapDisplay = display;
    if (display) {
      setTimeout(() => {
        this.initMap();
        this.onPrestataireSelected(null);
      }, 100);
    }
  }

  onCompleted(ev) {
    this.prestatairesSuggestions = this.prestataires.filter((prestataire) => {
      return prestataire.nom.toLowerCase().includes(ev?.query.toLowerCase());
    });
  }

  onPrestataireSelected(ev) {
    console.log(ev);
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.markers = [];
    this.newsService
      .getStructuresByPrestataires(this.prestataire)
      .pipe(
        tap((structures) => {
          this.structures = structures;
          this.structures.forEach((struct) => {
            const marker = this.addMarker(struct);
            this.markers.push(marker);
          });
        })
      )
      .subscribe();
  }
}
