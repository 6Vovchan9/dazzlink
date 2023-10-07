import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressive-image',
  templateUrl: './progressive-image.component.html',
  styleUrls: ['./progressive-image.component.scss']
})
export class ProgressiveImageComponent implements OnInit {

  @Input() tinyImageSrc: string;
  @Input() fullImageSrc: string;
  @Input() scrolledElName: string;

  constructor() { }

  ngOnInit(): void {
    // this.aboutProgressiveImage();
  }

  ngAfterViewInit(): void {
    this.aboutProgressiveImage();
  }

  private aboutProgressiveImage(): void {
    // if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) {

      // window.addEventListener('load', () => {

        let pItem = document.getElementsByClassName('progressive replace'), timer;

        let scrolledEl;
        if (this.scrolledElName) {
          scrolledEl = document.getElementById(this.scrolledElName);
        }

        (scrolledEl || window).addEventListener('scroll', scroller, false);
        window.addEventListener('resize', scroller, false);

        setTimeout(() => {
        inView();
        }, 5000);

        function scroller(e) {
          timer = timer || setTimeout(function () {
            timer = null;
            requestAnimationFrame(inView);
          }, 300);
        }

        function inView() {

          let wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB, p = 0;
          while (p < pItem.length) {

            cRect = pItem[p].getBoundingClientRect();
            pT = wT + cRect.top;
            pB = pT + cRect.height;

            if (wT < pB && wB > pT) {
              loadFullImage(pItem[p]);
              pItem[p].classList.remove('replace');
            }
            else p++;

          }
        }

        // replace with full image
        function loadFullImage(item) {

          if (!item || !item.href) return;

          // load image
          let img = new Image();
          if (item.dataset) {
            img.srcset = item.dataset.srcset || '';
            img.sizes = item.dataset.sizes || '';
          }
          img.src = item.href;
          img.className = 'reveal';
          if (img.complete) addImg();
          else img.onload = addImg;

          // replace image
          function addImg() {

            // disable click
            item.addEventListener('click', function (e) { e.preventDefault(); }, false);

            // add full image
            item.appendChild(img).addEventListener('animationend', function (e) {

              // remove preview image
              let pImg = item.querySelector && item.querySelector('img.preview');
              if (pImg) {
                e.target.alt = pImg.alt || '';
                item.removeChild(pImg);
                e.target.classList.remove('reveal');
              }

            });

          }

        }

      // }, false)
    // }
  }

}
