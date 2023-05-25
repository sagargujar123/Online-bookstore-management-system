import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.addOfferForm = this.formbuilder.group({
      promoCode: new FormControl('',[Validators.required]),
      discountAmount: new FormControl('',[Validators.required]),
      applicableAmount: new FormControl('',[Validators.required]),
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[Validators.required]),
      maxApply: new FormControl('',[Validators.required]),
    });
  }

  addOfferToOfferList() {
    const data = this.addOfferForm.value;
    this.offerListService.addOffer(data).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 201) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
        this.addOfferForm.reset();
        this.dialogRef.close();
      }
    });
  }
}
