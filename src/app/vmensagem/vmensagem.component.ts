import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-vmessege',
  templateUrl: './vmensagem.component.html'
})
export class VmensagemComponent {

  @Input() text = '';

}
