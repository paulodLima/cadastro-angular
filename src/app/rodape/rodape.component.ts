import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit {
 test: Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
