import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OfferListService } from 'src/app/services/offer-list.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOfferComponent } from '../add-offer/add-offer.component';
import { UpdateOfferComponent } from '../update-offer/update-offer.component'

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
  providers: [DialogService]
})
export class OfferListComponent implements OnInit {
  offers: any;
  totalOffers: any;

  dialogRef!: DynamicDialogRef;

  constructor(
    private offerListService: OfferListService,
    private messageService: MessageService,
    public dialogService: DialogService) { }

  ngOnInit(): void {
    this.offerList()
  }

  offerList() {
    this.offerListService.getAllOffers().subscribe((response: any) => {
      this.offers = response;
      this.totalOffers = this.offers.length;
      console.log(response);
    });
  }

  //Add Offer
  addNewOffer() {
    this.dialogRef = this.dialogService.open(AddOfferComponent, {
      header: 'Add New Offer',
      width: '410px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 1000,
    });

    this.dialogRef.onClose.subscribe(() => {
      this.offerList();
    });
  }

  //Update Offer
  getOfferToUpdate(offerId: any) {
    localStorage.setItem('offerId', offerId);
    const dialogRef = this.dialogService.open(UpdateOfferComponent, {
      header: 'Update Offer',
      width: '410px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 1000,
    });

    dialogRef.onClose.subscribe(() => {
      this.offerList();
    });
  }

  deleteOffer(offerId: any) {
    this.offerListService.deleteOfferByOfferId(offerId).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
        this.offerList();
      }
    });
  }
}
