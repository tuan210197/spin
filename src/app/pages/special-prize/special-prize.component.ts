import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Fireworks } from 'fireworks-js';
import confetti from 'canvas-confetti';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ShareService } from '../../services/share.service';
import { firstValueFrom } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


export interface First {
  vn_name: string;
  code: string;
  joins: string;
  bu: string;
}


@Component({
  selector: 'app-special-prize',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, CommonModule],
  templateUrl: './special-prize.component.html',
  styleUrl: './special-prize.component.css'
})
export class SpecialPrizeComponent implements AfterViewInit {

  // ngAfterViewInit(): void {
  //   const container = this.containerRef.nativeElement;
  //   if (container) {
  //     this.initializeFallingEffect(container);
  //   } else {
  //     console.error('Container element not found!');
  //   }
  // }
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild('container2') containerRef!: ElementRef<HTMLDivElement>;
  // @ViewChild('fireworksContainer', { static: false }) fireworksContainer!: ElementRef;


  // private total = 50;
  // private w = window.innerWidth;
  // private h = window.innerHeight;
  // fireworks: any;
  // color = '#ADD8E6';
  // isImageVisible = false;
  // isImageFading = false;
  // isVisible = false;
  // showWinnerDiv: boolean = false; // Trạng thái hiển thị div người chiến thắng

  // startFireworks(): void {
  //   const container = this.fireworksContainer.nativeElement;
  //   this.fireworks = new Fireworks(container, {
  //     autoresize: true,
  //     opacity: 0.2,
  //     decay: { min: 0.01, max: 0.027 },
  //     delay: { min: 30, max: 60 },
  //     hue: { min: 0, max: 360 },
  //     traceLength: 3,
  //     traceSpeed: 15,
  //     rocketsPoint: { min: 0, max: 100 },
  //     acceleration: 1.00,
  //     friction: 0.98,
  //     gravity: 1.5,
  //     particles: 150,
  //     explosion: 5,
  //     intensity: 50,
  //     flickering: 170,
  //     brightness: { min: 70, max: 100 },
  //   });

  //   this.fireworks.start();

  //   setTimeout(() => {
  //     this.fireworks.waitStop();
  //   }, 5000);
  // }


  // title = 'colorful-confetti';

  // launchConfetti(duration: number = 3): void {
  //   const end = Date.now() + duration * 1000;

  //   const colors = [
  //     '#FF1493', '#9400D3', '#FF0000', '#FFFF00',
  //     '#7CFC00', '#66CDAA', '#00FFFF', '#00BFFF',
  //     '#F4A460', '#FFF0F5'
  //   ];

  //   const frame = () => {
  //     confetti({
  //       particleCount: 10,
  //       angle: 60,
  //       spread: 100,
  //       origin: { x: 0 },
  //       colors: colors,
  //     });

  //     confetti({
  //       particleCount: 10,
  //       angle: 120,
  //       spread: 100,
  //       origin: { x: 1 },
  //       colors: colors,
  //     });

  //     if (Date.now() < end) {
  //       requestAnimationFrame(frame);
  //     }
  //   };

  //   frame();
  // }



  // participants: { name: string; code: string }[] = [];
  // finalWinner: { name: string; code: string } | null = null;
  // transformStyle: string = '';
  // currentOffset: number = 0;
  // lineHeight: number = 50; // Chiều cao mỗi dòng
  // isRaffleRunning: boolean = false;
  // intervalId: any;
  // hasWinnerDisplayed: boolean = false; // Trạng thái hiển thị người trúng


  // constructor(private http: HttpClient, private share: ShareService) {

  // }

  // async  startRaffle(): Promise<void> {
  //   this.participants = [];
  //   console.log('Danh sách người tham gia:', this.participants);
  //   try {
  //     const randomData = await this.share.getRandom().toPromise();
  //     this.participants = Array.isArray(randomData)
  //       ? randomData.map((item: any) => ({ name: item.vn_name, code: item.code }))
  //       : [];
  //     console.log(randomData);
  //   } catch (err) {
  //     console.error('Lỗi khi gọi API getRandom:', err);
  //     return; // Dừng lại nếu lỗi xảy ra
  //   }
  
  //   if (this.isRaffleRunning) {
  //     return; // Không cho chạy lại khi đang quay
  //   }
  
  //   this.isRaffleRunning = true;
  //   this.resetRaffle();
  
  //   try {
  //     const specialData = await firstValueFrom(this.share.getSpecial());
  //     if (specialData) {
  //       this.finalWinner = {
  //         name: specialData.vn_name,
  //         code: specialData.code
  //       };
  //     } else {
  //       console.error('specialData is undefined');
  //       return;
  //     }
  //     console.log('Dữ liệu sau khi map:', this.finalWinner);
  
  //     this.participants.push(this.finalWinner);
  //     this.showWinnerDiv = false; // Ẩn div người chiến thắng khi bắt đầu quay
  //     this.runAnimation();
  //   } catch (err) {
  //     console.error('Lỗi khi gọi API getSpecial:', err);
  //   }
  
  // }

  // runAnimation(): void {
  //   const duration = 5000; // Tổng thời gian quay (15 giây)
  //   const totalNames = this.participants.length; // Tổng số tên cần cuộn qua
  //   const startTime = Date.now();
  //   const endTime = startTime + duration;
  //   this.isVisible = false;


  //   const updatePosition = () => {
  //     const currentTime = Date.now();
  //     const elapsedTime = currentTime - startTime;
  //     const t = Math.min(elapsedTime / duration, 1); // Tỉ lệ thời gian từ 0 -> 1

  //     // Tính toán tiến trình giảm tốc dựa trên easing
  //     const easedProgress = this.easeOutQuad(t);
  //     const targetIndex = Math.floor(easedProgress * (totalNames - 1));

  //     // Tính toán offset
  //     this.currentOffset = targetIndex * this.lineHeight;
  //     this.transformStyle = `translateY(-${this.currentOffset}px)`;

  //     if (currentTime < endTime) {
  //       requestAnimationFrame(updatePosition);
  //     } else {
  //       // Kết thúc và dừng tại người trúng giải
  //       // this.currentOffset = winnerIndex * this.lineHeight;
  //       this.transformStyle = `translateY(-${this.currentOffset}px)`;
  //       this.isRaffleRunning = false;
  //       this.showWinnerDiv = true; // Hiện div người chiến thắng sau khi quay xong
  //     }
  //   };

  //   requestAnimationFrame(updatePosition); // Khởi động vòng lặp
  //   // this.audio.play()

  //   setTimeout(() => {
  //     this.launchConfetti();
  //     setTimeout(() => {
  //       this.isVisible = true;

  //     }, 300);
  //     // this.audio.pause();
  //     // this.audio.currentTime = 7; // Đặt thời gian về 0
  //     // this.audio2.play();
  //   }, 5000);


  // }


  // easeOutQuad(t: number): number {
  //   return t * (2 - t); // Hàm easing cho giảm tốc
  // }


  // resetRaffle(): void {
  //   this.isRaffleRunning = false;
  //   this.transformStyle = '';
  //   this.currentOffset = 0;
  //   this.finalWinner = null;
  //   this.hasWinnerDisplayed = false; // Reset trạng thái hiển thị
  // }


  // private initializeFallingEffect(container: HTMLDivElement): void {
  //   for (let i = 0; i < this.total; i++) {
  //     const div = document.createElement('div');
  //     div.className = 'dot';
  //     div.style.backgroundImage = 'url(/hoadao.png)';
  //     div.style.backgroundSize = 'cover'; // Đảm bảo ảnh khớp với hình dạng của 
  //     div.style.backgroundSize = '100% 100%'; // Đặt ảnh khớp với kích thước của phần tử
  //     div.style.backgroundRepeat = 'no-repeat';
  //     div.style.width = `${this.random(10, 30)}px`;
  //     div.style.height = `${this.random(10, 30)}px`;
  //     div.style.position = 'absolute';
  //     div.style.marginTop = '-20%';

  //     gsap.set(div, { x: this.random(0, this.w), y: this.random(-200, -150), z: this.random(-200, 200) });
  //     container.appendChild(div);
  //     this.animateElement(div);
  //   }
  // }
  // private animateElement(elm: HTMLElement): void {

  //   gsap.to(elm, {
  //     y: this.h + 100,
  //     duration: this.random(6, 15),
  //     ease: 'none',
  //     repeat: -1,
  //     delay: -15
  //   });
  //   gsap.to(elm, {
  //     x: `+=100`,
  //     rotationZ: this.random(0, 180),
  //     duration: this.random(4, 8),
  //     repeat: -1,
  //     yoyo: true,
  //     ease: 'sine.inOut'
  //   });
  //   gsap.to(elm, {
  //     rotationX: this.random(0, 360),
  //     rotationY: this.random(0, 360),
  //     duration: this.random(2, 8),
  //     repeat: -1,
  //     yoyo: true,
  //     ease: 'sine.inOut',
  //     delay: -5
  //   });
  // }
  // private random(min: number, max: number): number {
  //   return Math.max(min, Math.min(max, min + Math.random() * (max - min)));
  // }

  ngAfterViewInit(): void {
    const container = this.containerRef.nativeElement;
    if (container) {
      this.initializeFallingEffect(container);
    } else {
      console.error('Container element not found!');
    }
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('container2') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('fireworksContainer', { static: false }) fireworksContainer!: ElementRef;


  private total = 50;
  private w = window.innerWidth;
  private h = window.innerHeight;
  fireworks: any;
  color = '#ADD8E6';
  isImageVisible = false;
  isImageFading = false;
  isVisible = false;
  showWinnerDiv: boolean = false; //  Trạng thái hiển thị div người chiến thắng
  showWinnerDiv1: boolean = true; // Trạng thái hiển thị div người chiến thắng
  showWinnerDiv2: boolean = false; // Trạng thái hiển thị div người chiến thắng
  showWinnerDiv3: boolean = false;
  participants: { name: string; code: string, bu: string, joins: string }[] = [];
  finalWinner: { name: string; code: string, bu: string, joins: string } | null = null;
  transformStyle: string = '';
  currentOffset: number = 0;
  lineHeight: number = 50; // Chiều cao mỗi dòng
  isRaffleRunning: boolean = true;
  intervalId: any;
  hasWinnerDisplayed: boolean = false; // Trạng thái hiển thị người trúng
  requestId = 0; // Tham chiếu của requestAnimationFrame
  tableVisible = false;
  listWinner: First[] = [];
  dataSource = new MatTableDataSource<First>([]);
  displayedColumns: string[] = ['code', 'vn_name', 'bu', 'joins','action'];
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
    const end = Date.now() + duration * 1000;

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

  constructor(private http: HttpClient, private share: ShareService) {
  }

  async startRaffle(): Promise<void> {

    // const second: First = { code: '0', vn_name: '', bu: '', working_time: 'B', joins: '' };
    const listWinner = await firstValueFrom(this.share.getListSpecial());
    if (Array.isArray(listWinner) && listWinner.length == 6) {

      this.loadTable();

      return;
    }

    if (this.isRaffleRunning) {
      this.tableVisible = false;
      this.participants = [];
      try {
        const randomData = await this.share.getRandom().toPromise();
        this.participants = Array.isArray(randomData)
          ? randomData.map((item: any) => ({ name: item.vn_name, code: item.code, bu: item.bu, joins: item.joins }))
          : [];
      } catch (err) {
        console.error('Lỗi khi gọi API getRandom:', err);
        return; // Dừng lại nếu lỗi xảy ra
      }
      this.resetRaffle();
      const totalNames = this.participants.length; // Tổng số tên cần cuộn qua
      let currentIndex = 0;

      const updatePosition = () => {
        // Tăng chỉ số vòng quay nhanh hơn
        currentIndex = (currentIndex + 3) % totalNames; // Tăng mỗi lần 3 bước (điều chỉnh theo ý bạn)

        // Tính toán offset dựa trên vị trí hiện tại
        this.currentOffset = currentIndex * this.lineHeight;
        this.transformStyle = `translateY(-${this.currentOffset}px)`;
        this.requestId = requestAnimationFrame(updatePosition); // Tiếp tục vòng lặp
      };

      this.requestId = requestAnimationFrame(updatePosition); // Bắt đầu vòng lặp 
      const insert2A = await firstValueFrom(this.share.getSpecial());
      console.log(insert2A)
      this.isRaffleRunning = false;
      this.showWinnerDiv1 = true
      if (this.showWinnerDiv1) {
        this.showWinnerDiv2 = false
      }

    } else {
      cancelAnimationFrame(this.requestId); // Dừng vòng lặp
      this.isRaffleRunning = true;
      this.showWinnerDiv1 = false
      if (!this.showWinnerDiv1) {
        this.showWinnerDiv2 = true
      }
      const listWinner = await firstValueFrom(this.share.getListSpecial());
      console.log(listWinner)
      const okela = Array.isArray(listWinner) ? listWinner[listWinner.length -1] : null;
      if (okela) {
        this.finalWinner = {
          name: okela.code,
          code: okela.vn_name,
          bu: okela.bu,
          joins: okela.joins === 'Y' ? 'Tham Gia' : 'Vắng'
        };
        this.launchConfetti();
        return;
      } else {
        console.error('specialData is undefined');
      }
      // this.loadTable();  
      this.resetRaffle();

      this.tableVisible = false;
      return;
    }
  }
  async loadTable(): Promise<void> {
    this.listWinner = [];
    this.showWinnerDiv1 = false
    this.showWinnerDiv2 = false
    this.showWinnerDiv3 = true
    this.tableVisible = true
    // const second: First = { code: '0', vn_name: '', bu: '', working_time: 'B', joins: '' };
    try {
      const listWinner = await firstValueFrom(this.share.getListSpecial());

      (Array.isArray(listWinner) ? listWinner : []).forEach(item => this.listWinner.push({
        code: item.code,
        vn_name: item.vn_name,
        bu: item.bu,
        joins: item.joins === 'Y' ? 'Tham Gia' : 'Vắng'
      }));
      console.log(this.listWinner);
      this.dataSource.data = this.listWinner;
      // this.paginator.length = this.listWinner.length;
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  }


  easeOutQuad(t: number): number {
    return t * (2 - t); // Hàm easing cho giảm tốc
  }


  resetRaffle(): void {
    this.isRaffleRunning = true;
    this.transformStyle = '';
    this.currentOffset = 0;
    this.finalWinner = null;
    this.hasWinnerDisplayed = false; // Reset trạng thái hiển thị

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
  async onDelete(special: First): Promise<void> {
    
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa người chơi này không?');

    if (confirmDelete) {
      await this.share.onDeleteSpecial(special).subscribe(
        () => {
          console.log('Xóa thành công');
          // Nếu cần, gọi API để làm mới dữ liệu bảng
          this.tableVisible = true
          this.loadTable();
          this.showWinnerDiv1 = false; // Trạng thái hiển thị div người chiến thắng
          this.showWinnerDiv2 = false; // Trạng thái hiển thị div người chiến thắng
          this.isRaffleRunning= true
        },
        (error) => {
          console.error('Lỗi khi xóa:', error);
        }
      );
    }
  }
}

