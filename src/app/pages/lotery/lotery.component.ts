import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Fireworks } from 'fireworks-js';
import { ShareService } from '../../services/share.service';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-lotery',
  standalone: true,
  imports: [MatTabsModule, MatGridListModule, MatCardModule, MatListModule, MatButtonModule, CommonModule],
  templateUrl: './lotery.component.html',
  styleUrl: './lotery.component.css'
})


export class LoteryComponent {

  @ViewChild('fireworksContainer', { static: false }) fireworksContainer!: ElementRef;
  ngAfterViewInit(): void {
  }
  constructor(private share: ShareService) {
    this.availableNumbers = Array.from({ length: 100 }, (_, i) =>
      i.toString().padStart(2, '0')
    );


  }

  fireworks: any;
  randomNumber: number = 0;
  isRunning: boolean = true;
  intervalId: any;
  intervalTotal: any;
  generatedNumbers: { number: number }[] = []; // Danh sách số đã quay
  private audio = new Audio();
  private audio2 = new Audio();
  private audio3 = new Audio();
  enableClick: boolean = true;


  ngOnInit(): void {
    // Khởi tạo 2 đối tượng Audio
    this.audio.src = '/nhac.mp3';
    this.audio2.src = '/winner1.mp3';
    this.audio3.src = '/votay4.mp3';
  }

  playAudio1(): void {
    this.stopAudio(this.audio2); // Dừng audio 2 nếu đang phát
    this.startAudio(this.audio); // Phát audio 1
  }

  playAudio2(): void {
    this.stopAudio(this.audio); // Dừng audio 1 nếu đang phát
    this.startAudio(this.audio2); // Phát audio 2
    this.startAudio(this.audio3);
  }

  startAudio(audio: HTMLAudioElement): void {
    audio.currentTime = 0; // Đặt lại thời gian về đầu
    audio
      .play()
      .then(() => { })
      .catch((err) => console.error('Error playing audio:', err));
  }

  stopAudio(audio: HTMLAudioElement): void {
    if (!audio.paused) {
      audio.pause(); // Dừng phát nhạc
      audio.currentTime = 0; // Reset thời gian về đầu
    }
  }

  ngOnDestroy(): void {
    // Dọn dẹp khi component bị hủy
    this.stopAudio(this.audio);
    this.stopAudio(this.audio2);
    this.audio = null!;
    this.audio2 = null!;
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
    }, 3000);
  }
  numbers: string[] = []; // Mảng lưu các số đã được chọn
  availableNumbers: string[] = []; // Danh sách số từ 00-99
  availableNumbers2: string[] = []; // Danh sách số từ 00-99
  currentNumber: string = '00'; // Số hiện tại đang hiển thị
  btnText = '開始';

  async pickNumbers(): Promise<void> {
    this.btnText = '停止';
    const list_number = await firstValueFrom(this.share.getListNumber());
    this.availableNumbers2 = Array.isArray(list_number) ? list_number.map((item: any) => item.number) : [];
    if (this.isRunning) {
      this.playAudio1();
      const displayElement = document.getElementById('random-display');
      if (!displayElement) return;
      this.intervalTotal = setInterval(() => {
        // Hiển thị ngẫu nhiên một số
        this.currentNumber = this.availableNumbers[Math.floor(Math.random() * this.availableNumbers.length)];
      }, 5);
      this.isRunning = false;
    }
    else {

      this.playAudio2();
      this.isRunning = true;
      clearInterval(this.intervalTotal);
      this.startFireworks();
      this.share.getNumberChoosen().subscribe(
        async (data) => {
          const numbers = Array.isArray(data) ? data.map((item: any) => ({ number: item.number })) : [];
          if (numbers.length < 4) {
            const randomIndex = Math.floor(Math.random() * this.availableNumbers.length);
            const chosenNumber = this.availableNumbers[randomIndex];
            // Xóa số đã chọn khỏi mảng
            this.availableNumbers.splice(randomIndex, 1);
            // Cập nhật số chính thức và mảng
            this.currentNumber = chosenNumber;
            await this.share.chooseCon(Number(this.currentNumber)).toPromise();
            this.btnText = '開始';
          } else {
            const randomIndex = Math.floor(Math.random() * this.availableNumbers2.length);
            const chosenNumber = this.availableNumbers[randomIndex];
            // Xóa số đã chọn khỏi mảng
            this.availableNumbers.splice(randomIndex, 1);
            // Cập nhật số chính thức và mảng
            this.currentNumber = chosenNumber;
            await this.share.chooseCon(Number(this.currentNumber)).toPromise();
            this.btnText = '開始';
            const number = await firstValueFrom(this.share.getNumberChoosen());
            if (Array.isArray(number) && number.length == 7)
              this.btnText = '結束';
            else {
              this.btnText = '開始';
            }
          }
        }
      );
      this.checkCountNumber();

    }

  }

  checkCountNumber() {
    this.generatedNumbers = [];
    this.share.getNumberChoosen().subscribe(
      (data) => {
        const numbers = Array.isArray(data) ? data.map((item: any) => ({ number: item.number })) : [];
        console.log(numbers.length)
        if (numbers.length < 7) {
          this.generatedNumbers = numbers;
        } else {
          this.enableClick = false;
          this.generatedNumbers = numbers.slice(0, numbers.length - 1);
        }
      }
    );
  }
  // Hàm định dạng số thành chuỗi có hai chữ số
  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  checkCount() {
    this.share.getNumberChoosen().subscribe(
      (data) => {
        const numbers = Array.isArray(data) ? data.map((item: any) => ({ number: item.number })) : [];

        if (numbers.length < 6) {
          this.pickNumbers();

        }
        else if (numbers.length == 6) {
          this.pickNumbers();

        }
        else {
          this.currentNumber = this.formatNumber(Number(numbers[numbers.length - 1].number));
          this.generatedNumbers = numbers.slice(0, numbers.length - 1);
        }
        // console.log( this.formatNumber((Number(this.currentNumber))));
      }
    );

  }
}


