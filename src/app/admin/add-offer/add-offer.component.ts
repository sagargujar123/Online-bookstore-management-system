import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OfferListService } from 'src/app/services/offer-list.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  addOfferForm: any;

  constructor(
    private formbuilder: FormBuilder,
    private offerListService: OfferListService,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.addOfferForm = this.formbuilder.group({
      promoCode: [''],
      discountAmount: [''],
      applicableAmount: [''],
      startDate: [''],
      endDate: [''],
      maxApply: ['']
    });
  }

  addOfferToOfferList() {
    const data = this.addOfferForm.value;
    this.offerListService.addOffer(data).subscribe((response: any) => {
      console.log(response);
      if(response.statusCode===201){
        this.messageService.add({severity:'success', summary:'success', detail:response.message});
        this.addOfferForm.reset();
      }
    });
  }
}
