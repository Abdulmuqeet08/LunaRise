import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { insightsComponent } from './insights.component';

const routes: Routes = [
  {
    path: '',  // Add dynamic route for tableName
    component: insightsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class insightsRoutingModule {}
