import { Route } from '@angular/router';
import { FileComponent } from 'app/modules/admin/fileupload/file/file.component';
import {FileUploadResolver } from 'app/modules/admin/fileupload/file/file.resolvers';

export const FileUploadRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
       // redirectTo: 'fileupload',
        component: FileComponent,
        resolve  : {
                           entity    : FileUploadResolver                   
                     }
    }
  
    // {
    //     path     : '',
    //     component: MenuComponent,
    //     children : [
    //         {
    //             path     : 'entity/:entityId',
    //             component: MenuComponent,
    //             resolve  : {
    //                 entity    : SystemCofigurationMenuResolver                   
    //             }
    //         },
           
    //     ]
       
    // }
];
