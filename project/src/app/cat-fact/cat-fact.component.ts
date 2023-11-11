import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cat-fact',
  templateUrl: './cat-fact.component.html',
  styleUrls: ['./cat-fact.component.css']
})
export class CatFactComponent implements OnInit {
  catFact: string;
  catFactCreatedAt: string;

  constructor(private http: HttpClient) {
    this.catFact = 'Loading...';
    this.catFactCreatedAt = 'Loading...';
  }

  ngOnInit(): void {
    this.fetchCatFact();
  }

  fetchCatFact() {
    const apiUrl = 'https://cat-fact.herokuapp.com/facts/58e00b5f0aac31001185ed24';

    this.http.get(apiUrl).subscribe((data: any) => {
      this.catFact = data.text;
      this.catFactCreatedAt = data.createdAt;
    });
  }
}
