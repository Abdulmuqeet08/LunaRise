import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'costtype',
    templateUrl    : './costtype.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostTypeComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
