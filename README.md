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

### Dockerize the application

Make sure docker is installed on your machine by:

```bash
docker --version
```

Create dockerfile
```bash
touch Dockerfile
```

Add this content to it:
```bash
# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build
# Set the working directory
WORKDIR /usr/local/app
# Add the source code to app
COPY ./ /usr/local/app/
# Install all the dependencies
RUN npm install
# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/project /usr/share/nginx/html
# Expose port 80
EXPOSE 80
```

Build the docker image(while at the same location as the docker file)
```bash
docker build -t angular_realtime .
```

After the build is done you should see the image in your Docker Desktop app or by doing this command:

```bash
docker ps
```

To containerize the docker image and run it, do this command:

```bash
docker run -p 8080:80 angular_realtime
```

Open http://localhost:8080/ and you should see the app running.