import { Route } from '@angular/router';
import { CostTypeComponent } from 'app/modules/admin/apps/costtype/costtype.component';
import { CostTypeListComponent } from 'app/modules/admin/apps/costtype/list/list.component';
import { CostTypesDetailsComponent } from 'app/modules/admin/apps/costtype/details/details.component';
import { CostTypesResolver } from 'app/modules/admin/apps/costtype/costtype.resolvers';
import { CanDeactivateCostTypeDetails } from './costtype.guards';


export const CostTypeRoutes: Route[] = [
    {
        path     : '',
        component: CostTypeComponent,      
        children : [
            {
                path     : '',
                component: CostTypeListComponent,   
                resolve  : {
                    tasks    : CostTypesResolver,
                },            
                children : [
                    {
                        path         : ':id',
                        component    : CostTypesDetailsComponent,                       
                        canDeactivate: [CanDeactivateCostTypeDetails]
                    }
                ]
            }
        ]
    }
];