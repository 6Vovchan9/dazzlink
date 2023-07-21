import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public posts: Post[] = [];
  private pSub: Subscription;
  private dSub: Subscription
  public loading = true;

  constructor(
    private postsService: PostsService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(
      posts => {
        this.posts = posts;
        this.loading = false;
      }
    );
  }

  remove(id?: string) {
    if (id) {
      this.loading = true;
      this.dSub = this.postsService.remove(id).subscribe(
        () => {
          this.loading = false;
          this.posts = this.posts.filter(post => post.id !== id);
          this.alertService.danger('Пост был удален');
        }
      );
    }
  }

  goToEditPage(id: any) {
    this.loading = true;
    this.router.navigate(['/admin', 'post', id, 'edit']).then(
      (success: boolean) => {
        if (!success) {
          this.loading = false;
          this.alertService.warning('Упс, что-то пошло не так(')
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.pSub?.unsubscribe();
    this.dSub?.unsubscribe();
  }

}
