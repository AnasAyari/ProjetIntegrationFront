import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  url: string = 'https://logoraisr.p.rapidapi.com/rest-v1/previews/29cff5ad949748d8a4b8190cb366b29a/';
  options: RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'db20b84084msh36b640f8259f956p17789fjsn9754f5479a8d',
      'X-RapidAPI-Host': 'logoraisr.p.rapidapi.com'
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.fetchData();
  }

  // Define an asynchronous function to handle the fetch request
  fetchData = async (): Promise<void> => {
    try {
      const response: Response = await fetch(this.url, this.options);
      const result: string = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
}
