import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Fireworks } from 'fireworks-js';
import { ShareService } from '../../services/share.service';


@Component({
  selector: 'app-lotery',
  standalone: true,
  imports: [MatTabsModule, MatGridListModule, MatCardModule, MatListModule, MatButtonModule, CommonModule],
  templateUrl: './lotery.component.html',
  styleUrl: './lotery.component.css'
})


export class LoteryComponent {

  @ViewChild('fireworksContainer', { static: false }) fireworksContainer!: ElementRef;

  fireworks: any;
  ngAfterViewInit(): void {
  }
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
  numbers: string[] = []; // Mảng lưu các số đã được chọn
  availableNumbers: string[] = []; // Danh sách số từ 00-99
  currentNumber: string = '00'; // Số hiện tại đang hiển thị


  constructor(private share: ShareService) {
    this.availableNumbers = Array.from({ length: 100 }, (_, i) =>
      i.toString().padStart(2, '0')
    );
  }

  // Hàm lấy hai số ngẫu nhiên không trùng
  pickNumbers(): void {
    if (this.availableNumbers.length === 0) {
      alert('Hết số để chọn!');
      return;
    }

    const displayElement = document.getElementById('random-display');
    if (!displayElement) return;

    let interval = setInterval(() => {
      // Hiển thị ngẫu nhiên một số
      this.currentNumber = this.availableNumbers[
        Math.floor(Math.random() * this.availableNumbers.length)
      ];
    }, 20);

    setTimeout(() => {
      clearInterval(interval); // Dừng quay số sau 10 giây
      const randomIndex = Math.floor(Math.random() * this.availableNumbers.length);
      const chosenNumber = this.availableNumbers[randomIndex];

      // Cập nhật số chính thức và mảng
      this.currentNumber = chosenNumber;
      console.log(this.currentNumber);
      this.share.chooseCon(Number(this.currentNumber)).subscribe((data) => { console.log(data); });
      // this.numbers.push(chosenNumber);
      this.startFireworks();
    }, 5000);
  }


}


