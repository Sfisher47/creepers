import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trace } from 'src/app/models/trace.model';

@Component({
  selector: 'app-traces',
  templateUrl: './traces.component.html',
  styleUrls: ['./traces.component.scss']
})
export class TracesComponent implements OnInit {

  traces: Trace[];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.traces = this.route.snapshot.data['traces'];
  }

}
