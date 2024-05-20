import { Component } from '@angular/core';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css'],
})
export class LabComponent {
  previewSrc: string = 'assets/imgs/animus tekken.png';

  previewFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.previewSrc = 'path_to_default_picture';
    }
  }
}
