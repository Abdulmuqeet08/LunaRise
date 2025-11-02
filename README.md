Prerequisites :
Node version : 16.18.0
NPM Version : 8.19.2
Angular CLI: 12.2.1
Angular: 12.2.1

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1202.1 (cli-only)
@angular-devkit/build-angular   12.2.1
@angular-devkit/core            12.2.1 (cli-only)
@angular-devkit/schematics      12.2.1 (cli-only)
@angular/google-maps            9.2.4
@schematics/angular             12.2.1 (cli-only)
rxjs                            6.6.7
typescript                      4.3.5



#to install ngx-scanner-qrcode use the following command
npm install ngx-scanner-qrcode --save --force


for mobileno with country code
npm install @angular/flex-layout ngx-mat-select-search google-libphonenumber world-countries
npm install ngx-mat-tel-input --legacy-peer-deps

proxy-config.json settings

{
  /* proxy settings for dev environment*/
    "/devapi/": { /* variable name used to identify the redirection */
      "target": "http://localhost:4201/",
      "secure": false,
      "pathRewrite": {
        "^/devapi/": "" /* should be same as the variable name used to identify the redirection */
      },     
      "logLevel": "debug"
    },
    /* proxy settings for prod environment*/
    "/api/": {
        "target": "http://localhost:8443/",
        "secure": true,
        "pathRewrite": {
          "^/api/": ""
        }
        }    
  }

For cli error :
npm install -g @angular/cli@16 --force
npm install @angular/cli@16 --save-dev --force
  


  On Prod Instance:
  Additional sevice Scanner APP Private is deployed from the Ashirvad_Hybrid_App_Template repository
  ensure the env file is correctly updated as follows
  export const environment = {
  production: true,  
  API_URL: 'http://10.144.19.141/app-api/',  
  TOKEN : 'token',
    PLANT : 'plant',
    DEPOT : 'depot',
    DEVICE_ID : 'device_id',
    OPERATION_TYPE : 'operation_type',
    PRODUCTION_LINE : 'production_line',
    USER_ID : 'user_id',
    USER_Name : 'user_name',
    PENDING_DISPATCH_DATA : 'pending_dispatch_data',
    ProdLineID:'productionLineID',
    selectedPlant:'selectedPlant',
    selectedDepot:'selectedDepot',
    selectedProductionLine:'selectedProductionLine',
    app_logout_password:'56789'
};