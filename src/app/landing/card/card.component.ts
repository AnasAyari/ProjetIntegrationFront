import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommandService } from 'src/app/Services/command.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() album!: string;
  @Input() artist!: string;
  @Input() url!: string;
  @Input() posterId!: number;
  @Input() showDetailsButton = true;

  constructor(private router: Router) {}

  goToDetails(id: number) {
    this.router.navigate(['home/poster-detail', id]);
  }
}