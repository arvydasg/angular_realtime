import { Component, OnInit  } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.css']
})
export class TimeDisplayComponent implements OnInit {
  currentTime: Date = new Date();

  constructor(private timeService: TimeService) {}

  ngOnInit(): void {
    this.timeService.getTime().subscribe((time) => {
      this.currentTime = time;
    });
  }
}
