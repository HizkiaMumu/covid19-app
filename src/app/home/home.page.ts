import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataMeninggal: any = 0;
  dataPositif: any = 0;
  selectedCountry: any;
  dataSembuh: any = 0;
  dataCovid: any = [];
  countries: any;

  constructor(private http: HttpClient) {
    this.getCountries();
    this.getGlobalData();
  }

  getCountries(){
    this.http.get('https://restcountries.eu/rest/v2/all').subscribe((response) => {
      this.countries = response;
      console.log(this.countries);
    });
  }

  getGlobalData(){
    this.http.get('https://covidapi.info/api/v1/global/count').subscribe((response) => {
      console.log(response);
      this.dataCovid = [];

      for (let key in response.result) {
        if (response.result.hasOwnProperty(key)) {
          console.log(key + " -> " + response.result[key]);
          response.result[key].date = key;
          this.dataCovid.push(response.result[key]);

          this.dataPositif = response.result[key].confirmed;
          this.dataSembuh = response.result[key].recovered;
          this.dataMeninggal = response.result[key].deaths;
        }
      }

      this.dataCovid = this.dataCovid.reverse();
      console.log(this.dataCovid);
    });
  }

  selectCountry(){
    this.http.get('https://covidapi.info/api/v1/country/' + this.selectedCountry).subscribe((response) => {
      console.log(response);
      this.dataCovid = [];

      for (let key in response.result) {
        if (response.result.hasOwnProperty(key)) {
          console.log(key + " -> " + response.result[key]);
          response.result[key].date = key;
          this.dataCovid.push(response.result[key]);

          this.dataPositif = response.result[key].confirmed;
          this.dataSembuh = response.result[key].recovered;
          this.dataMeninggal = response.result[key].deaths;
        }
      }

      this.dataCovid = this.dataCovid.reverse();
      console.log(this.dataCovid);
    });
  }

}
