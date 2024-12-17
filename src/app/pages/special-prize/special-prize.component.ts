import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Fireworks } from 'fireworks-js';
import confetti from 'canvas-confetti';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ShareService } from '../../services/share.service';

export interface Participant {
  name: string;
  code: string;
}
@Component({
  selector: 'app-special-prize',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, CommonModule],
  templateUrl: './special-prize.component.html',
  styleUrl: './special-prize.component.css'
})
export class SpecialPrizeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const container = this.containerRef.nativeElement;
    if (container) {
      this.initializeFallingEffect(container);
    } else {
      console.error('Container element not found!');
    }

  }

  constructor(private http: HttpClient, private share: ShareService) {
    this.audio.currentTime = 7; // Đặt thời gian về 0
    this.audio.src = '/nhac.mp3';
    this.audio2.src = '/winner1.mp3';
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('container2') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('fireworksContainer', { static: false }) fireworksContainer!: ElementRef;

  private audio = new Audio();
  private audio2 = new Audio();
  private total = 50;
  private w = window.innerWidth;
  private h = window.innerHeight;
  fireworks: any;
  color = '#ADD8E6';
  isImageVisible = false;
  isImageFading = false;
  isVisible = false;

  startFireworks(): void {
    const container = this.fireworksContainer.nativeElement;
    this.fireworks = new Fireworks(container, {
      autoresize: true,
      opacity: 0.2,
      decay: { min: 0.01, max: 0.027 },
      delay: { min: 30, max: 60 },
      hue: { min: 0, max: 360 },
      traceLength: 3,
      traceSpeed: 15,
      rocketsPoint: { min: 0, max: 100 },
      acceleration: 1.00,
      friction: 0.98,
      gravity: 1.5,
      particles: 150,
      explosion: 5,
      intensity: 50,
      flickering: 170,
      brightness: { min: 70, max: 100 },
    });

    this.fireworks.start();

    setTimeout(() => {
      this.fireworks.waitStop();
    }, 5000);
  }


  title = 'colorful-confetti';

  launchConfetti(duration: number = 3): void {
    const end = Date.now() + duration * 5000;

    const colors = [
      '#FF1493', '#9400D3', '#FF0000', '#FFFF00',
      '#7CFC00', '#66CDAA', '#00FFFF', '#00BFFF',
      '#F4A460', '#FFF0F5'
    ];

    const frame = () => {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 100,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 10,
        angle: 120,
        spread: 100,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }



 participants: Participant[] = [];
  winner: { name: string; code: string }[] = [];
  finalWinner: { name: string; code: string } | null = null;
  transformStyle: string = '';
  currentOffset: number = 0;
  lineHeight: number = 50; // Chiều cao mỗi dòng
  isRaffleRunning: boolean = false;
  intervalId: any;
//  hasWinnerDisplayed: boolean = false; // Trạng thái hiển thị người trúng

  showWinnerDiv: boolean = false; // Trạng thái hiển thị div người chiến thắng


  startRaffle(): void {
    this.participants = [];
    this.share.getRandom().subscribe({

      next: (data) => {
        this.participants = Array.isArray(data) ? data.map(
          (item: any) => ({ name: item.vn_name, code: item.code })) : []; // Gán dữ liệu API vào mảng participants
      },
      error: (err) => {
        console.error('Lỗi khi gọi API:', err);
      }
    });

    if (this.isRaffleRunning) {
      return; // Không cho chạy lại khi đang quay
    }
    this.isRaffleRunning = true;
    this.resetRaffle();

    this.share.getSpecial().subscribe({
      next: (data) => {
        // Map data từ API vào finalWinner
        this.finalWinner = {
          name: data.vn_name, // Lấy vn_name từ API
          code: data.code     // Lấy code từ API
        };
        // Thêm vào mảng participants
        this.participants.push(this.finalWinner);
        this.showWinnerDiv = false;
        this.runAnimation();
      },
      error: (err) => {
        console.error('Lỗi khi gọi API:', err);
      }
    });
  }

  runAnimation(): void {
    const duration = 15000; // Tổng thời gian quay (15 giây)
    const totalNames = this.participants.length; // Tổng số tên cần cuộn qua
    const startTime = Date.now();
    const endTime = startTime + duration;
    const winnerIndex = this.participants.length + 1;
    this.isVisible = false;


    const updatePosition = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const t = Math.min(elapsedTime / duration, 1); // Tỉ lệ thời gian từ 0 -> 1

      // Tính toán tiến trình giảm tốc dựa trên easing
      const easedProgress = this.easeOutQuad(t);
      const targetIndex = Math.floor(easedProgress * (totalNames - 1));

      // Tính toán offset
      this.currentOffset = targetIndex * this.lineHeight;

      this.transformStyle = `translateY(-${this.currentOffset}px)`;

      if (currentTime < endTime) {
        requestAnimationFrame(updatePosition);
      } else {
        // Kết thúc và dừng tại người trúng giải
        this.currentOffset = winnerIndex * this.lineHeight;
        this.transformStyle = `translateY(-${this.currentOffset}px)`;
        this.isRaffleRunning = false;
        this.isRaffleRunning = false;
        this.showWinnerDiv = true; // Hiện div người chiến thắng sau khi quay xong
      }
    };

    requestAnimationFrame(updatePosition); // Khởi động vòng lặp
    this.audio.play()

    setTimeout(() => {
      this.launchConfetti();
      setTimeout(() => {
        this.isVisible = true;

      }, 300);
      this.audio.pause();
      this.audio.currentTime = 7; // Đặt thời gian về 0
      this.audio2.play();
    }, 15000);


  }


  easeOutQuad(t: number): number {
    return t * (2 - t); // Hàm easing cho giảm tốc
  }


  resetRaffle(): void {
    this.isRaffleRunning = false;
    this.transformStyle = '';
    this.currentOffset = 0;
    this.finalWinner = null;
   // this.hasWinnerDisplayed = false; // Reset trạng thái hiển thị

  }


  private initializeFallingEffect(container: HTMLDivElement): void {
    for (let i = 0; i < this.total; i++) {
      const div = document.createElement('div');
      div.className = 'dot';
      div.style.backgroundImage = 'url(/hoadao.png)';
      div.style.backgroundSize = 'cover'; // Đảm bảo ảnh khớp với hình dạng của 
      div.style.backgroundSize = '100% 100%'; // Đặt ảnh khớp với kích thước của phần tử
      div.style.backgroundRepeat = 'no-repeat';
      div.style.width = `${this.random(10, 30)}px`;
      div.style.height = `${this.random(10, 30)}px`;
      div.style.position = 'absolute';
      div.style.marginTop = '-20%';

      gsap.set(div, { x: this.random(0, this.w), y: this.random(-200, -150), z: this.random(-200, 200) });
      container.appendChild(div);
      this.animateElement(div);
    }
  }
  private animateElement(elm: HTMLElement): void {

    gsap.to(elm, {
      y: this.h + 100,
      duration: this.random(6, 15),
      ease: 'none',
      repeat: -1,
      delay: -15
    });
    gsap.to(elm, {
      x: `+=100`,
      rotationZ: this.random(0, 180),
      duration: this.random(4, 8),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    gsap.to(elm, {
      rotationX: this.random(0, 360),
      rotationY: this.random(0, 360),
      duration: this.random(2, 8),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: -5
    });
  }
  private random(min: number, max: number): number {
    return Math.max(min, Math.min(max, min + Math.random() * (max - min)));
  }

}

