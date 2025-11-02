import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CostType } from 'app/modules/admin/apps/costtype/costtype.types';
import { 
    GET_COSTTYPE_LIST_URL    
  } from '@fuse/models/url';
@Injectable({
    providedIn: 'root'
})
export class CostTypesService
{
    // Private
    private _costtype: BehaviorSubject<CostType | null> = new BehaviorSubject(null);
    private _costtypes: BehaviorSubject<CostType[] | null> = new BehaviorSubject(null);
    // private _countries: BehaviorSubject<Country[] | null> = new BehaviorSubject(null);
    // private _tags: BehaviorSubject<Tag[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for contact
     */
    get costtype$(): Observable<CostType>
    {
        return this._costtype.asObservable();
    }

    /**
     * Getter for contacts
     */
    get costtypes$(): Observable<CostType[]>
    {
        return this._costtypes.asObservable();
    }

    

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get contacts
     */
    getCostTypes(): Observable<CostType[]>
    {
            return this._httpClient.get<CostType[]>(GET_COSTTYPE_LIST_URL).pipe(
                tap((response: any) => {
                    console.log("response.entity",response.entity)
                    this._costtypes.next(response.entity);
                })
                );
    }



    /**
     * Search contacts with given query
     *
     * @param query
     */
    searchCostTypes(query: string): Observable<CostType[]>
    {
        return this._httpClient.get<CostType[]>('api/apps/contacts/search', {
            params: {query}
        }).pipe(
            tap((contacts) => {
                this._costtypes.next(contacts);
            })
        );
    }

    /**
     * Get contact by id
     */
    getCostTypeById(id: string): Observable<CostType>
    {
        return this._costtypes.pipe(
            take(1),
            map((contacts) => {

                // Find the contact
                const contact = contacts.find(item => item.id === id) || null;

                // Update the contact
                this._costtype.next(contact);

                // Return the contact
                return contact;
            }),
            switchMap((contact) => {

                if ( !contact )
                {
                    return throwError('Could not find user with id of ' + id + '!');
                }

                return of(contact);
            })
        );
    }

    /**
     * Create contact
     */
    createCostType(): Observable<CostType>
    {
        return this.costtypes$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.post<CostType>('api/apps/contacts/contact', {}).pipe(
                map((newCostType) => {

                    // Update the contacts with the new contact
                    this._costtypes.next([newCostType, ...contacts]);

                    // Return the new contact
                    return newCostType;
                })
            ))
        );
    }

    /**
     * Update contact
     *
     * @param id
     * @param contact
     */
    updateCostType(id: string, costtype: CostType): Observable<CostType>
    {
        return this.costtypes$.pipe(
            take(1),
            switchMap(costtypes => this._httpClient.patch<CostType>('api/apps/contacts/contact', {
                id,
                costtype
            }).pipe(
                map((updatedCostType) => {

                    // Find the index of the updated contact
                    const index = costtypes.findIndex(item => item.id === id);

                    // Update the contact
                    costtypes[index] = updatedCostType;

                    // Update the contacts
                    this._costtypes.next(costtypes);

                    // Return the updated contact
                    return updatedCostType;
                }),
                switchMap(updatedCostType => this.costtype$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the contact if it's selected
                        this._costtype.next(updatedCostType);

                        // Return the updated contact
                        return updatedCostType;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the contact
     *
     * @param id
     */
    deleteCostType(id: string): Observable<boolean>
    {
        return this.costtypes$.pipe(
            take(1),
            switchMap(costtypes => this._httpClient.delete('api/apps/contacts/contact', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted contact
                    const index = costtypes.findIndex(item => item.id === id);

                    // Delete the contact
                    costtypes.splice(index, 1);

                    // Update the contacts
                    this._costtypes.next(costtypes);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

   
}
