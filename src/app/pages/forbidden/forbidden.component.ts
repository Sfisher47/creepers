import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trace } from 'src/app/models/trace.model';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
