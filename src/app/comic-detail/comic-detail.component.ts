import { CommentRequest } from './../entities/comment.request';
import { ViewRequest } from './../entities/view-request';
import { MyConstant } from './../constant/MyConstant';
import { FavoriteRequest } from './../entities/favorite-request';
import { UserService } from './../service/user.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { PageService } from './../service/page.service';
import { ComicResponse } from './../entities/comic-response';
import { ComicService } from './../service/comic.service';
import { CustomPage } from './../entities/custom-page';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { ViewsReport } from '../entities/views-report';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {
  @ViewChild('myChart', {static: true}) chart: ElementRef;

  pages: CustomPage[] = [];
  currentImageToUpload: File;

  uploadForm: FormData = new FormData();
  currentComic: ComicResponse = new ComicResponse();

  viewsReport: ViewsReport = new ViewsReport();

  pagesChanged = false;
  pagesUpdated = false;

  isFavorited = false;

  constructor(private route: ActivatedRoute, private comicService: ComicService,
              private pageService: PageService, private sanitizer: DomSanitizer,
              private router: Router, public token: TokenStorageService,
              private userSerivce: UserService) {

  }

  updateViewsReport() {
    const id = this.route.snapshot.paramMap.get('id');
    this.comicService.getViewsReport(+id).subscribe((data: ViewsReport) => {
      this.viewsReport = data;

      this.createChart();
      console.log(data);
    }, error => {
    });
  }

  getSanitizer(url: string) {
    url = MyConstant.API_ENDPOINT + 'page/' + url;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getSanitizerForCover() {
    let url = MyConstant.API_ENDPOINT + 'page/';
    if (this.pages.length > 0) {
      url = url + this.pages[0].id;
    } else {
    }

    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {
    this.updateComicInfo();
  }

  updateComicInfo() {
    const id = this.route.snapshot.paramMap.get('id');
    this.comicService.getComic(+id).subscribe((data: ComicResponse) => {
      this.currentComic = data;
      this.updateViewsReport();
      if (this.token.getUsername && this.token.getAuthorities()[0] === 'ROLE_USER') {
        this.checkFavorState();
      }
      this.getAllPages();
    });
  }

  checkFavorState() {
    const favRequest: FavoriteRequest = new FavoriteRequest();
    favRequest.username = this.token.getUsername();
    favRequest.comicId = this.currentComic.id;

    this.userSerivce.checkFavoriteState(favRequest).subscribe(data => {
      this.isFavorited = data;
    });
  }

  updatePageIndex() {
    const idsToUpdate: number[] = [];
    this.pages.forEach(page => {
      idsToUpdate.push(page.id);
    });


    this.pageService.updatePages(this.currentComic.id, idsToUpdate).subscribe(data => {
    }, error => {
      this.pagesChanged = false;
      this.pagesUpdated = true;
    });
  }

  removeFromPages(position: number) {
    this.pages.splice(position, 1);
    this.pagesChanged = true;
  }

  uploadPage() {
    this.uploadForm = new FormData();
    this.uploadForm.append('file', this.currentImageToUpload);
    this.uploadForm.append('comicId', this.currentComic.id + '');
    this.uploadForm.append('comicId', this.currentComic.id + '');
    this.uploadForm.append('index', this.pages.length + '');

    this.pageService.uploadPage(this.uploadForm).subscribe(data => {
      this.getAllPages();
    }, error => {
      this.getAllPages();
    });

  }

  uuidSender() {
    console.log('Uuid sent');
    this.comicService.countView(new ViewRequest(this.token.getUUID(), this.currentComic.id)).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  favorite() {
    if (this.token.getUsername()) {
      const favRequest: FavoriteRequest = new FavoriteRequest();
      favRequest.username = this.token.getUsername();
      favRequest.comicId = this.currentComic.id;

      this.userSerivce.favorite(favRequest).subscribe(data => {
        this.checkFavorState();
        this.updateComicInfo();
      });
    } else {
      this.router.navigate(['login']);
    }
  }

  navigateToMainList() {
    this.router.navigate(['admin/comics']);
  }

  navigateToRead(id: number) {
    this.uuidSender();
    this.router.navigate(['comic/read', id]);
  }

  public getAllPages() {
    this.pageService.getAllPages(this.currentComic.id).subscribe(data => {
      this.pages = data;
    }, error => {
    });
  }

  onFileSelected(event) {
    event.target.files = null;
    this.currentImageToUpload = event.target.files[0] as File;
    this.uploadPage();
  }

  movePageTo(currentIndex: number, destinationIndex: number) {
    if (this.pages.length > 1) {

      if (destinationIndex) {
        if (destinationIndex < 0) {destinationIndex = 0; }
        if (destinationIndex > this.pages.length - 1) {destinationIndex = this.pages.length - 1; }

        const temp = this.pages[destinationIndex] ;
        this.pages[destinationIndex] = this.pages[currentIndex];
        this.pages[currentIndex] = temp;

        this.pagesChanged = true;
      }
    }

  }

  createChart() {
    const ctx = this.chart.nativeElement.getContext('2d');
    ctx.height = 300;
    Chart.defaults.global.legend.display = false;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'day ' + this.viewsReport.viewDays[6].day,
          'day ' + this.viewsReport.viewDays[5].day,
          'day ' + this.viewsReport.viewDays[4].day,
          'day ' + this.viewsReport.viewDays[3].day,
          'day ' + this.viewsReport.viewDays[2].day,
          'day ' + this.viewsReport.viewDays[1].day,
          'day ' + this.viewsReport.viewDays[0].day
        ],
        datasets: [{
            lineTension: 0,
            data: [
              this.viewsReport.viewDays[6].views,
              this.viewsReport.viewDays[5].views,
              this.viewsReport.viewDays[4].views,
              this.viewsReport.viewDays[3].views,
              this.viewsReport.viewDays[2].views,
              this.viewsReport.viewDays[1].views,
              this.viewsReport.viewDays[0].views
            ],
            backgroundColor: [
                'rgba(81,229,255,0.2)',
            ],
            borderColor: 'rgba(23,86,118,1)',
            borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            yAxes: [{
              display: false,
            }],
            xAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 7,
              }
            }]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
              label(tooltipItems, data) {
              return tooltipItems.yLabel + ' views';
            }
          }
        }
      }
    });
  }

}
