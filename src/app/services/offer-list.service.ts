import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OfferListService {
  private baseUrl = "https://bookstore-mnmt-system.osc-fr1.scalingo.io";

  constructor(private http: HttpClient) { }

  getAllOffers() {
    return this.http.get(`${this.baseUrl}/offer/all`);
  }

  addOffer(data: any) {
    return this.http.post(`${this.baseUrl}/offer/add`, data);
  }

  getOfferByOfferId(id:any){
    return this.http.get(`${this.baseUrl}/offer/${id}`);
  }

  updateOfferByOfferId(id: any, data: any) {
    return this.http.put(`${this.baseUrl}/offer/update/${id}`, data);
  }

  deleteOfferByOfferId(id: any) {
    return this.http.delete(`${this.baseUrl}/offer/delete/${id}`);
  }

  applyOffer(data:any){
    return this.http.post(`${this.baseUrl}/offer/discount`,data);
  }
}
