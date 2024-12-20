import { Component, AfterViewInit, ElementRef, ViewChild, HostListener,OnInit, OnDestroy } from '@angular/core';
import { Fireworks } from 'fireworks-js';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { gsap } from 'gsap';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-waiting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.css'
})
export class WaitingComponent implements AfterViewInit{
  
  @ViewChild('fireworksContainer', { static: false }) fireworksContainer!: ElementRef;
  @ViewChild('container2') containerRef!: ElementRef<HTMLDivElement>;
  constructor(){
    //    // Khởi tạo đối tượng audio
    // this.audio = new Audio();
    // this.audio.src = '/tetDongDay.mp3';
    // this.audio.play();  // Gọi phương thức play()
    // this.audio.loop = false;  // Đặt thành false để chúng ta tự quản lý việc lặp lại

  }
  private total = 50;
  private w = window.innerWidth;
  private h = window.innerHeight;
// private audio = new Audio();
  fireworks: any;
  ngAfterViewInit(): void {
    this.startFireworks();

    const container = this.containerRef.nativeElement;
    if (container) {
      this.initializeFallingEffect(container);
    } else {
      console.error('Container element not found!');
    };
  }

  audio!: HTMLAudioElement;

 
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
        this.fireworks.waitStop(); // Ngừng hoàn toàn
      }, 5000); // Thời gian để các hạt rơi hết
    
  }
  private initializeFallingEffect(container: HTMLDivElement): void {
    for (let i = 0; i < this.total; i++) {
      const div = document.createElement('div');
      div.className = 'dot';
      div.style.backgroundImage = 'url(http://localhost:4200/hoadao.png)';
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
  

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
  }
}
