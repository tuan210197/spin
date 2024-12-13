import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

export interface WinnerData {
  vietnam: string;
  code: string;
  winner: string;
}
@Component({
  selector: 'app-first-prize',
  imports: [MatTableModule, MatPaginatorModule,MatIconModule],
  standalone: true,
  templateUrl: './first-prize.component.html',
  styleUrl: './first-prize.component.css'
})
export class FirstPrizeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  color='#ADD8E6';
  winner: string = ''; // Số hiện tại đang hiển thị

  names: string[] = Array.from({ length: 20000 }, (_, i) => `Person ${i + 1}`);
  winners: string[] = [];
  dataSource = new MatTableDataSource<string>(this.winners);
  // dataSource = new MatTableDataSource<WinnerData>([]);


    // Cột hiển thị
    displayedColumns: string[] =  ['index', 'vietnam','china','code','actions'];
    // ['position', 'vietnam','china','code'];
  pickWinner() {
    const winnerElement = document.getElementById('winner');
    if (!winnerElement) return;

    let interval = setInterval(() => {
      winnerElement.textContent = this.names[Math.floor(Math.random() * this.names.length)];
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      const winner = this.names[Math.floor(Math.random() * this.names.length)];
      console.log(winner)
      winnerElement.textContent = winner;
      this.winners.push(winner);
      this.dataSource.data = [...this.winners]; // Cập nhật dataSource để bảng render lại
      this.paginator._changePageSize(this.paginator.pageSize); // Cập nhật paginator để render lại
    }, 3000);
  }

  delete(){

  }
}
