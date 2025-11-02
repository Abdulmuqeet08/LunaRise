import { environment } from '../environments/environment';

environment;
export class APIValues {

  
  static readonly LOGIN =
    environment.API_URL + '/android/user/login';

  static readonly PART_LIST =
    environment.API_URL + '/android/bundle/part-list';

    static readonly MATERIAL_SCAN_TYPE =
    environment.API_URL + '/android/bundle/material-scan-type';

    static readonly PENDING_ITEMS =
    environment.API_URL + '/android/bundle/pending-items';

    static readonly CLEAR_ITEMS =
    environment.API_URL + '/android/bundle/clear-items';

    static readonly BUNDLE_MAP =
    environment.API_URL + '/android/bundle/map';

    
    static readonly DEPOT_OR_DISTRIBUTOR_LIST =
    environment.API_URL + '/android/dispatch/entity-list';

    
    static readonly SUB_ENTITY_LIST =
    environment.API_URL + '/android/dispatch/sub-entity-list';

    
    static readonly ORDER_DUPLICATE_CHECK =
    environment.API_URL + '/android/dispatch/order-duplicate-check';


    static readonly BUNDLE_DUPLICATE_CHECK =
    environment.API_URL + '/android/dispatch/bundle-duplicate-check';

    
    static readonly ORDER_MAP =
    environment.API_URL + '/android/dispatch/map';

    static readonly UNMAP_BUNDLE =
    environment.API_URL + '/android/dispatch/unmap-bundle';

    
    static readonly PENDING_ORDERS =
    environment.API_URL + '/android/dispatch/pending-orders';


    static readonly PENDING_ORDERS_DETAILS =
    environment.API_URL + '/android/dispatch/pending-orders-details';

    static readonly DEVICE_CONFIG =
    environment.API_URL + '/android/config/save-config';


    
}
