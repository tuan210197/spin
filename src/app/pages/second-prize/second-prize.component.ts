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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';
import JSConfetti from 'js-confetti';


interface Second {
  code: string;
  vn_name: string;
  bu: string;
  working_time: string;
  joins: string;
  receive: number;
}

@Component({
  selector: 'app-second-prize',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, CommonModule, MatSlideToggleModule],
  templateUrl: './second-prize.component.html',
  styleUrl: './second-prize.component.css'
})
export class SecondPrizeComponent implements AfterViewInit {

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
  showWinnerDiv1: boolean = true; // Trạng thái hiển thị div người chiến thắng
  showWinnerDiv2: boolean = false; // Trạng thái hiển thị div người chiến thắng
  showWinnerDiv3: boolean = false;
  participants: { name: string; code: string }[] = [];
  listWinner: Second[] = [];
  finalWinner: { name: string; code: string, bu: string, joins: string } | null = null;
  transformStyle: string = '';
  currentOffset: number = 0;
  lineHeight: number = 50; // Chiều cao mỗi dòng
  isRaffleRunning: boolean = true;
  intervalId: any;
  hasWinnerDisplayed: boolean = false; // Trạng thái hiển thị người trúng
  tableVisible = false;
  requestId = 0; // Tham chiếu của requestAnimationFrame
  dataSource = new MatTableDataSource<Second>([]);
  displayedColumns: string[] = ['position', 'code', 'vn_name', 'bu', 'joins', 'action'];
  totalLength = 0;
  pageSize = 6; // Số bản ghi trên mỗi trang
  visible = true;
  totalCountSecond =0;
  private jsConfetti = new JSConfetti();
  private audio = new Audio();
  private audio2 = new Audio();
  private audio3 = new Audio();
  private audio4 = new Audio();
  ngOnInit(): void {
    // Khởi tạo 2 đối tượng Audio
    this.audio.src = '/award.mp3';
    this.audio2.src = '/winner1.mp3';
    this.audio3.src = '/winning1.mp3';
    this.audio4.src = '/votay4.mp3';
  }

  playAudio1(): void {
    this.stopAudio(this.audio2); // Dừng audio 2 nếu đang phát
    this.startAudio(this.audio); // Phát audio 1
  }

  playAudio2(): void {
    this.stopAudio(this.audio); // Dừng audio 1 nếu đang phát
    // this.startAudio(this.audio2); // Phát audio 2
    this.startAudio(this.audio3);
    this.startAudio(this.audio4);
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

  confettiSettings() {
    this.jsConfetti
      .addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
      })
      .then(() => this.jsConfetti.addConfetti());
  }
  constructor(private http: HttpClient, private share: ShareService) { }

  async startRaffle(): Promise<void> {

    const check = await firstValueFrom(this.share.checkThird());
    if (check === 70) {


      const second: Second = { code: '0', vn_name: '', bu: '', working_time: 'A', joins: '', receive: 0 };
      const listWinner = await firstValueFrom(this.share.getListSecond(second));

      this.listWinner = Array.isArray(listWinner) ? listWinner : [];
      const count = this.listWinner.filter((item: any) => item.receive === 1).length;
      console.log(count)
      if (count == 6) {
      
        this.visible = false;
        this.loadTable2();
        this.playAudio2();
        // this.launchConfetti();
        this.confettiSettings();
        this.startFireworks();
        return;
      }

      if (this.isRaffleRunning) {
        this.playAudio1();
        this.listWinner = [];
        this.tableVisible = false;
        this.participants = [];
        this.visible = false;
        try {
          const randomData = await this.share.getRandom().toPromise();
          this.participants = Array.isArray(randomData)
            ? randomData.map((item: any) => ({ name: item.vn_name, code: item.code }))
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

        this.isRaffleRunning = false;
        this.showWinnerDiv1 = true
        if (this.showWinnerDiv1) {
          this.showWinnerDiv2 = false
        }

      } else {
        this.visible = false;
        this.playAudio2();
        const insert2A = await firstValueFrom(this.share.getSecondA());
        const second: Second = { code: '0', vn_name: '', bu: '', working_time: 'A', joins: '', receive: 0 };
        const listWinner = await firstValueFrom(this.share.getListSecond(second));
        
        const count: number = await firstValueFrom(this.share.getCountSeconda()) as number;
        this.totalCountSecond = count;
        cancelAnimationFrame(this.requestId); // Dừng vòng lặp
        this.isRaffleRunning = true;
        this.showWinnerDiv1 = false
        if (!this.showWinnerDiv1) {
          this.showWinnerDiv2 = true
        }
        if (listWinner) {
          this.finalWinner = {
            name: listWinner[0].code,
            code: listWinner[0].vn_name,
            bu: listWinner[0].bu,
            joins: listWinner[0].joins === 'Y' ? 'Tham Gia' : 'Vắng'
          };
          // this.launchConfetti();
          this.confettiSettings();
          this.startFireworks();
          return;
        } else {
          console.error('specialData is undefined');
        }
        this.loadTable();  
        this.resetRaffle();

        this.tableVisible = false;
        return;
      }
    } else {
      Swal.fire({
        title: 'Bạn Chưa Quay Hết Giải Ba!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      return;
    }

  }
  async loadTable(): Promise<void> {
    this.listWinner = [];
    this.showWinnerDiv1 = false
    this.showWinnerDiv2 = false
    this.tableVisible = true
    const second: Second = { code: '0', vn_name: '', bu: '', working_time: 'A', joins: '', receive: 0 };
    try {
      const listWinner = await firstValueFrom(this.share.getListSecond(second));

      listWinner.forEach(item => this.listWinner.push({
        code: item.code,
        vn_name: item.vn_name,
        bu: item.bu,
        working_time: item.working_time,
        joins: item.joins === 'Y' ? 'Tham Gia' : 'Vắng',
        receive: item.receive,
      }));
      console.log(this.listWinner);
      this.dataSource.data = this.listWinner;
      this.totalLength = this.listWinner.length; // Tổng số bản ghi

      // Đặt paginator ở trang cuối cùng
      const totalPages = Math.ceil(this.totalLength / this.pageSize);
      if (totalPages > 0) {
        this.paginator.pageIndex = totalPages - 1; // Trang cuối cùng
        this.paginator._changePageSize(this.pageSize); // Kích hoạt thay đổi
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  }
  async loadTable2(): Promise<void> {
    this.listWinner = [];
    this.showWinnerDiv1 = false
    this.showWinnerDiv2 = false
    this.showWinnerDiv3 = true
    this.tableVisible = true
    try {
      const second: Second = { code: '0', vn_name: '', bu: '', working_time: 'A', joins: '', receive: 0 };
      const listWinner = await firstValueFrom(this.share.getListSecond2(second));

      (Array.isArray(listWinner) ? listWinner : []).forEach(item => this.listWinner.push({
        code: item.code,
        vn_name: item.vn_name,
        bu: item.bu,
        joins: item.joins === 'Y' ? 'Tham Gia' : 'Vắng',
        receive: item.receive,
        working_time: item.working_time
      }));
      console.log(this.listWinner);
      this.dataSource.data = this.listWinner;
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


  async onToggleChange(element: any, event: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success me-2",
        cancelButton: "btn btn-danger ms-2"
      },
      buttonsStyling: false
    });
    if (element.receive === 1) {
      swalWithBootstrapButtons.fire({
        title: `Bạn có chắc chắn muốn xóa <br>${element.vn_name} không?`,
        text: 'Hành động này sẽ không thể hoàn tác.',
        icon: 'question', // Biểu tượng cảnh báo
        showCancelButton: true, // Hiển thị nút Cancel
        confirmButtonText: 'Có', // Nút xác nhận
        cancelButtonText: 'Không', // Nút hủy
        reverseButtons: false // Đảo ngược thứ tự nút (nút "Có" sẽ ở bên trái)
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Nếu người dùng nhấn "Có"
          swalWithBootstrapButtons.fire('Đã xác nhận!', 'Hành động đã được thực hiện.', 'success');
          element.status = 0; // Cập nhật giá trị 1 hoặc 0
          element.receive = event.checked ? 1 : 0;
          const update = await firstValueFrom(this.share.onToggleChangeSecond(element));
          this.loadTable2();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Nếu người dùng nhấn "Không"
          swalWithBootstrapButtons.fire('Đã hủy', 'Hành động bị hủy bỏ.', 'error');
          console.log('User clicked No');
          this.loadTable();
        }
      });
    } else {
      swalWithBootstrapButtons.fire('Thông Báo', 'Người Chơi Không Thể Nhận Giải', 'info');
      this.loadTable2();
    }

  }
}
