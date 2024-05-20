import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Command } from 'src/app/Classes/command';
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
  commandForm!: FormGroup;

  constructor(
    private commandService: CommandService,
    private posterService: PosterService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.commandForm = this.formBuilder.group({
      posters: this.formBuilder.array([]),
      location: ['', Validators.required],
    });
    this.getAllPosters();
  }

  getAllPosters() {
    this.posterService.getAllPosters().subscribe((data) => {
      this.posters = data;
      console.log(this.posters);

      this.posters.forEach((poster, index) => {
        (this.commandForm.controls['posters'] as FormArray).push(
          this.formBuilder.control(false)
        );
      });
    });
  }

  onSubmit(): void {
    if (this.commandForm.valid) {
      const selectedPosters = this.posters.filter(
        (poster, index) => this.commandForm.value.posters[index]
      );
      const command = {
        userId: Number(localStorage.getItem(this.USER_ID_KEY)),
        posters: selectedPosters.map((poster) => poster.id),
        location: this.commandForm.value.location,
      };
      console.log(command);
      this.commandService.createCommand(command).subscribe();
    }
  }
}
