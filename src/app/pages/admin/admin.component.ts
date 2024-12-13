import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {

  participants: { name: string; code: string }[] = [];
  finalWinner: { name: string; code: string } | null = null;
  transformStyle: string = '';
  currentOffset: number = 0;
  lineHeight: number = 50; // Chiều cao mỗi dòng
  isRaffleRunning: boolean = false;
  intervalId: any;
  hasWinnerDisplayed: boolean = false; // Trạng thái hiển thị người trúng


  constructor(private http: HttpClient) {
    // Tạo danh sách giả lập (có thể thay bằng dữ liệu từ backend)
    this.participants = Array.from({ length: 2000 }, (_, i) => ({
      name: `Participant ${i + 1}`,
      code: `EMP${i + 1}`
    }));
  }

  startRaffle(): void {

    if (this.isRaffleRunning) {
      return; // Không cho chạy lại khi đang quay
    }
    this.isRaffleRunning = true;
    this.resetRaffle();
    // Gọi API lấy người trúng thưởng
    // this.http.get<{ name: string; code: string }>('http://your-backend/api/winner').subscribe((winner) => {
    // this.finalWinner = ['', winner.code];
    this.finalWinner = { name: 'tuan', code: 'EMP1' };
    // Đưa người trúng vào cuối danh sách
    this.sortParticipants();

    // Bắt đầu hiệu ứng quay
    this.runAnimation();
    // });
  }

  sortParticipants(): void {
    // Loại bỏ người trúng (nếu đã tồn tại) và thêm lại vào cuối
    this.participants = this.participants.filter(
      (participant) => participant.code !== this.finalWinner?.code
    );
    if (this.finalWinner) {
      this.participants.push(this.finalWinner);
    }
  }
  runAnimation(): void {
    const duration = 5000; // Tổng thời gian quay (15 giây)
    const totalNames = this.participants.length; // Tổng số tên cần cuộn qua
    const startTime = Date.now();
    const endTime = startTime + duration;
    const winnerIndex = this.participants.length - 1;

  
    const updatePosition = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const t = Math.min(elapsedTime / duration, 1); // Tỉ lệ thời gian từ 0 -> 1
  
      // Tính toán tiến trình giảm tốc dựa trên easing
      const easedProgress = this.easeOutQuad(t);
  
      // Xác định index dựa trên tiến trình giảm tốc
      const targetIndex = Math.floor(easedProgress * (totalNames - 1));
  
      // Tính toán offset
      this.currentOffset = targetIndex * this.lineHeight;
  
      // Cập nhật vị trí bằng CSS transform
      this.transformStyle = `translateY(-${this.currentOffset}px)`;
  
      if (currentTime < endTime) {
        requestAnimationFrame(updatePosition);
      } else {
        // Kết thúc và dừng tại người trúng giải
        this.currentOffset = winnerIndex * this.lineHeight;
        this.transformStyle = `translateY(-${this.currentOffset}px)`;
  
        this.hasWinnerDisplayed = true;
        this.isRaffleRunning = false;
      }
    };
  
    requestAnimationFrame(updatePosition); // Khởi động vòng lặp
  }
  
   easeOutQuad(t: number): number {
    return t * (2 - t); // Hàm easing cho giảm tốc
  }
  

  resetRaffle(): void {
    this.isRaffleRunning = false;
    this.transformStyle = '';
    this.currentOffset = 0;
    this.finalWinner = null;
    this.hasWinnerDisplayed = false; // Reset trạng thái hiển thị

  }

}
