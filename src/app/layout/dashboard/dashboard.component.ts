import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
/** Based on the screen size, switch from standard to one column per row */
  
  
  dados = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { matriculados: '234' }
        ]
      }
      return [
        { matriculados: '234' }
      ]
    })
  )
  

  constructor(private breakpointObserver: BreakpointObserver) {}
}
