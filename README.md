# angular_realtime

Thought this could be the most simple project. Can try it on raspberry pi.

## How this project was created

### Create a new Angular project:

Open a terminal and run the following commands:

```bash
ng new project
cd project
```

### Generate a Time Service:

Generate a service to handle time-related logic.

```bash
ng generate service time
```

Open the `src/app/time.service.ts` file and implement the following:

```ts
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  getTime(): Observable<Date> {
    return interval(1000).pipe(map(() => new Date()));
  }
}
```

###  Create a Time Component:

Generate a component to display the real-time.

```bash
ng generate component time-display
```

Open the `src/app/time-display/time-display.component.ts` file and implement the following:

```ts
import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-time-display',
  template: '<p>{{ currentTime | date: "mediumTime" }}</p>',
  styleUrls: ['./time-display.component.css'],
})
export class TimeDisplayComponent implements OnInit {
  currentTime: Date;

  constructor(private timeService: TimeService) {}

  ngOnInit(): void {
    this.timeService.getTime().subscribe((time) => {
      this.currentTime = time;
    });
  }
}
```

### Use the Time Component in App Component:

Open the `src/app/app.component.html` file and replace its content with:

```html
<div style="text-align: center;">
  <h1>Real-time Clock</h1>
  <app-time-display></app-time-display>
</div>
```

### Call the variable

In `src/app/time-display/time-display.component.html` call the variable:

```html
<p>{{ currentTime }}</p>
<!-- <p>{{ currentTime | date: 'mediumTime' }}</p> -->
```

### Run the Application:

Save your changes and run the application with:

```bash
ng serve
```

Open your browser and navigate to http://localhost:4200/. You should see the real-time display of the current time.