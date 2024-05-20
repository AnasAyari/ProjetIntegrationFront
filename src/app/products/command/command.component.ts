import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommandService } from 'src/app/Services/command.service';
import { PosterService } from 'src/app/Services/poster.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css'],
})
export class CommandComponent implements OnInit {
  private readonly USER_ID_KEY = 'user_id';
  posters: any[] = [];
  selectedPosterIds: number[] = [];
  commandForm!: FormGroup;

  constructor(
    private commandService: CommandService,
    private posterService: PosterService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.commandForm = this.formBuilder.group({
      location: ['', Validators.required],
    });
    this.getAllPosters();
  }

  getAllPosters() {
    this.posterService.getAllPosters().subscribe((data) => {
      this.posters = data;
    });
  }

  onCheckboxChange(posterId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedPosterIds.push(posterId);
    } else {
      const index = this.selectedPosterIds.indexOf(posterId);
      if (index > -1) {
        this.selectedPosterIds.splice(index, 1);
      }
    }
    console.log('Selected poster IDs:', this.selectedPosterIds);
  }

  onSubmit(): void {
    if (this.commandForm.valid) {
      const command = {
        userId: Number(localStorage.getItem(this.USER_ID_KEY)),
        posters: this.selectedPosterIds,
        location: this.commandForm.value.location,
      };

      console.log('Command:', command);
      this.commandService.createCommand(command).subscribe();
    }
  }
}