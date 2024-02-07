import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  public isSessionActive = false;

  constructor(
    private storage: StorageService,
    private route: Router,
    private cacheService: CacheService
  ) { }

  async ngOnInit() {
    this.cacheService.getAuthObservable().subscribe({
      next: (data) => {
        if (data.auth === true) {
          this.isSessionActive = true;
        } else {
          this.isSessionActive = false;
        }
      },
      error: () => { },
      complete: async () => { }
    });
    const auth = await this.storage.get('auth');
    if (auth) {
      this.isSessionActive = true;
    } else {
      this.isSessionActive = false;
    }
  }

  async logout() {
    const res = await this.storage.remove('auth');
    this.isSessionActive = false
    this.cacheService.publishAuthData({ auth: false });
    this.route.navigateByUrl('login');
  }
}
