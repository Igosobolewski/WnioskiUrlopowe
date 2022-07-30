import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  RodzajUrlopu = ["Macierzyński", "Normalny", "Inny"]
  HolidayForm !: FormGroup;
  actionBtn : string = "Zapisz";
  constructor(private formBuilder : FormBuilder, private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.HolidayForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Substitute: ['', Validators.required],
      Type: ['', Validators.required],
      Comment: ['', Validators.required],
      Date : ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Zaktualizuj Wniosek";
      this.HolidayForm.controls['Name'].setValue(this.editData.Name);
      this.HolidayForm.controls['Substitute'].setValue(this.editData.Substitute);
      this.HolidayForm.controls['Type'].setValue(this.editData.Type);
      this.HolidayForm.controls['Comment'].setValue(this.editData.Comment);
      this.HolidayForm.controls['Date'].setValue(this.editData.Date);
    }  
  }

  AddHolidayForm(){
    if(!this.editData){
      if(this.HolidayForm.valid){
        this.api.postHolidayForm(this.HolidayForm.value)
        .subscribe({
          next:(res)=>{
            alert("Dodano wniosek!");
            this.HolidayForm.reset();
            this.dialogRef.close('Zapisz');
          },
          error:()=>{
            alert("Error encountered!")
          }
        })
      }
    }else{
      this.updateHolidayForm()
    }
  }
  updateHolidayForm(){
    this.api.putHolidayForm(this.HolidayForm.value, this.editData.id)
    .subscribe({
      next:(res)=> {
        alert("Wniosek zaktualizowany");
        this.HolidayForm.reset();
        this.dialogRef.close('update');
      },
      error:()=> {
        alert("Error encountered!")
      }
    })
  }

}
