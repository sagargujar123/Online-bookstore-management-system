import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OfferListService } from 'src/app/services/offer-list.service';

@Component({
  selector: 'app-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.css'],
  providers: [DynamicDialogRef]
})
export class UpdateOfferComponent implements OnInit {
  offerId = localStorage.getItem('offerId');
  updateOfferForm: any;
  responseItem: any;

  constructor(
    private offerListService: OfferListService,
    private formbuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getOffer();

    this.updateOfferForm = this.formbuilder.group({
      offerId: [''],
      promoCode: [''],
      discountAmount: [''],
      applicableAmount: [''],
      startDate: [''],
      endDate: [''],
      maxApply: ['']
    });
  }

  getOffer() {
    this.offerListService.getOfferByOfferId(this.offerId).subscribe((response: any) => {
      this.responseItem = response;
      console.log(response);
      this.setOfferData();
    });
  }

  setOfferData() {
    this.updateOfferForm.patchValue({
      offerId: this.responseItem.offerId,
      promoCode: this.responseItem.promoCode,
      discountAmount: this.responseItem.discountAmount,
      applicableAmount: this.responseItem.applicableAmount,
      startDate: this.responseItem.startDate,
      endDate: this.responseItem.endDate,
      maxApply: this.responseItem.maxApply
    });
  }

  updateOffer() {
    const offerId = this.offerId;
    const data = this.updateOfferForm.value;
    this.offerListService.updateOfferByOfferId(offerId, data).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
        this.updateOfferForm.reset();
      }
    });
  }
}
