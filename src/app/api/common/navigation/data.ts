/* eslint-disable */
import { P4UNavigationItem } from '@fuse/components/navigation';

// Menu items for Admin Role


export const defaultNavigation: P4UNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboards/TRA',
    },
    {
        id: 'reports',
        title: 'Reports',
        //  subtitle: 'Define the masters',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [
            {
                id: 'reports.production',
                title: 'Production',
                type: 'basic',
                icon: 'heroicons_outline:view-grid',
                link: '/reports/report/production',
            },
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/reports/report/dispatch'
            },
            {
                id: 'reports.return',
                title: 'Return',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/reports/report/return'
            },
            {
                id: 'reports.audit.level.0',
                title: 'Audit',
                icon: 'heroicons_outline:calculator',
                type: 'collapsable',
                children: [
                    {
                        id: 'reports.audit.level.0.1-1',
                        title: 'Distributor',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/audit_distributor'
                    },
                   /*  {
                        id: 'reports.audit.level.0.1-2',
                        title: 'Dealer',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/audit_dealer'
                    } */
                ]
            },
          /*   {
                id: 'reports.consumption',
                title: 'Consumption',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/reports/report/'
            },
            {
                id: 'reports.ageing',
                title: 'Ageing',
                type: 'basic',
                icon: 'heroicons_outline:clock',
                link: '/reports/report/'
            },
            {
                id: 'reports.unmap',
                title: 'Unmap',
                type: 'basic',
                icon: 'heroicons_outline:paper-clip',
                link: '/reports/report/'
            },*/
            {
                id: 'reports.deviceGraph.level.0',
                title: 'Device Utilization Graph',
                type: 'collapsable',
                icon: 'heroicons_outline:chart-square-bar',               
                children: [
                    {
                        id: 'reports.deviceGraph.level.0.1-1',
                        title: 'Dispatch',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/deviceGraph'
                    },
                    {
                        id: 'reports.audit.deviceGraph.0.1-2',
                        title: 'Pipe to Bundle',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/deviceGraphPB'
                    }
                ]
            },
            /*{
                id: 'reports.printLabel',
                title: 'Label Print',
                type: 'basic',
                icon: 'heroicons_outline:printer',
                link: '/reports/report/'
            }*/

        ]
    },


    {
        id: 'configuration',
        title: 'Configuration',
        type: 'group',
        icon: 'heroicons_outline:cog',
        children: [
            {
                id: 'configuration.plant',
                title: 'Plant Master',
                type: 'basic',
                icon: 'heroicons_outline:office-building',
                link: '/configuration/entity/1',
            },
            {
                id: 'configuration.production',
                title: 'Production Master',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/configuration/entity/production'
            },
            {
                id: 'configuration.depot',
                title: 'Depot Master',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/configuration/entity/2'
            },
            {
                id: 'configuration.distributor',
                title: 'Distributor Master',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/configuration/entity/3'
            },
           /*  {
                id: 'configuration.dealer',
                title: 'Dealer Master',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/configuration/entity/dealer'
            }, */
            {
                id: 'configuration.device',
                title: 'Device Master',
                type: 'basic',
                icon: 'heroicons_outline:device-mobile',
                link: '/configuration/entity/device'
            },
            {
                id: 'configuration.parts',
                title: 'Part Master',
                type: 'basic',
                icon: 'heroicons_outline:cog',
                link: '/configuration/entity/parts'
            },
            {
                id: 'configuration.users',
                title: 'User Master',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/configuration/entity/users'
            }
        ]
    },
    {
        id: 'android',
        title: 'Android Configuration',
        type: 'group',
        icon: 'heroicons_outline:device-mobile',
        children: [
            {
                id: 'android.device',
                title: 'Device Master',
                type: 'basic',
                icon: 'heroicons_outline:device-mobile',
                link: '/android/devices',
            },
            {
                id: 'android.events',
                title: 'Event Master',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/android/events'
            },
            {
                id: 'android.videos',
                title: 'Video Master',
                type: 'basic',
                icon: 'heroicons_outline:video-camera',
                link: '/android/videos'
            },
            {
                id: 'android.usp',
                title: 'USP Master',
                type: 'basic',
                icon: 'heroicons_outline:information-circle',
                link: '/android/usp'
            },
            {
                id: 'android.contacts',
                title: 'Contact Master',
                type: 'basic',
                icon: 'heroicons_outline:identification',
                link: '/android/contacts'
            }
        ]
    },
    {
        id: 'utility',
        title: 'Utilities',
        type: 'group',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'utility.bundle',
                title: 'Bundle QR',
                type: 'basic',
                icon: 'heroicons_outline:qrcode',
                link: '/utilities/bundles',
            },
            {
                id: 'utility.pipes',
                title: 'Pipe QR',
                type: 'basic',
                icon: 'heroicons_outline:qrcode',
                link: 'utilities/pipes'
            },
            {
                id: 'utility.delete',
                title: 'Delete',
                type: 'basic',
                icon: 'heroicons_outline:trash',
                link: '/utilities/delete'
            }
        ]
    }
];
export const compactNavigation: P4UNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboards/lms',
    },
    {
        id: 'reports',
        title: 'Reports',
        //  subtitle: 'Define the masters',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [
            {
                id: 'reports.production',
                title: 'Production',
                type: 'basic',
                icon: 'heroicons_outline:view-grid',
                link: '/reports/report/production',
            },
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/reports/report/dispatch'
            },
            {
                id: 'reports.return',
                title: 'Return',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/reports/report/return'
            },
            {
                id: 'reports.audit.level.0',
                title: 'Audit',
                icon: 'heroicons_outline:calculator',
                type: 'collapsable',
                children: [
                    {
                        id: 'reports.audit.level.0.1-1',
                        title: 'Distributor',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/audit_distributor'
                    },
                   /*  {
                        id: 'reports.audit.level.0.1-2',
                        title: 'Dealer',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/audit_dealer'
                    } */
                ]
            },
          /*   {
                id: 'reports.consumption',
                title: 'Consumption',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/reports/report/'
            },
            {
                id: 'reports.ageing',
                title: 'Ageing',
                type: 'basic',
                icon: 'heroicons_outline:clock',
                link: '/reports/report/'
            },
            {
                id: 'reports.unmap',
                title: 'Unmap',
                type: 'basic',
                icon: 'heroicons_outline:paper-clip',
                link: '/reports/report/'
            },*/
            {
                id: 'reports.deviceGraph.level.0',
                title: 'Device Utilization Graph',
                type: 'collapsable',
                icon: 'heroicons_outline:chart-square-bar',               
                children: [
                    {
                        id: 'reports.deviceGraph.level.0.1-1',
                        title: 'Dispatch',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/deviceGraph'
                    },
                    {
                        id: 'reports.audit.deviceGraph.0.1-2',
                        title: 'Pipe to Bundle',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/deviceGraphPB'
                    }
                ]
            },
           /**/

        ]
    },


    {
        id: 'configuration',
        title: 'Configuration',
        type: 'group',
        icon: 'heroicons_outline:cog',
        children: [
            {
                id: 'configuration.plant',
                title: 'Plant Master',
                type: 'basic',
                icon: 'heroicons_outline:office-building',
                link: '/configuration/entity/1',
            },
            {
                id: 'configuration.production',
                title: 'Production Master',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/configuration/entity/production'
            },
            {
                id: 'configuration.depot',
                title: 'Depot Master',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/configuration/entity/2'
            },
            {
                id: 'configuration.distributor',
                title: 'Distributor Master',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/configuration/entity/3'
            },
           /*  {
                id: 'configuration.dealer',
                title: 'Dealer Master',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/configuration/entity/dealer'
            }, */
            {
                id: 'configuration.device',
                title: 'Device Master',
                type: 'basic',
                icon: 'heroicons_outline:device-mobile',
                link: '/configuration/entity/device'
            },
            {
                id: 'configuration.parts',
                title: 'Part Master',
                type: 'basic',
                icon: 'heroicons_outline:cog',
                link: '/configuration/entity/parts'
            },
            {
                id: 'configuration.users',
                title: 'User Master',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/configuration/entity/users'
            }
        ]
    },
    {
        id: 'android',
        title: 'Android Configuration',
        type: 'group',
        icon: 'heroicons_outline:device-mobile',
        children: [
            {
                id: 'android.device',
                title: 'Device Master',
                type: 'basic',
                icon: 'heroicons_outline:device-mobile',
                link: '/android/devices',
            },
            {
                id: 'android.events',
                title: 'Event Master',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/android/events'
            },
            {
                id: 'android.videos',
                title: 'Video Master',
                type: 'basic',
                icon: 'heroicons_outline:video-camera',
                link: '/android/videos'
            },
            {
                id: 'android.usp',
                title: 'USP Master',
                type: 'basic',
                icon: 'heroicons_outline:information-circle',
                link: '/android/usp'
            },
            {
                id: 'android.contacts',
                title: 'Contact Master',
                type: 'basic',
                icon: 'heroicons_outline:identification',
                link: '/android/contacts'
            }
        ]
    },
    {
        id: 'utility',
        title: 'Utilities',
        type: 'group',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'utility.bundle',
                title: 'Bundle QR',
                type: 'basic',
                icon: 'heroicons_outline:qrcode',
                link: '/utilities/bundles',
            },
            {
                id: 'utility.pipes',
                title: 'Pipe QR',
                type: 'basic',
                icon: 'heroicons_outline:qrcode',
                link: 'utilities/pipes'
            },
            {
                id: 'utility.delete',
                title: 'Delete',
                type: 'basic',
                icon: 'heroicons_outline:trash',
                link: '/utilities/delete'
            }
        ]
    }
];
export const futuristicNavigation: P4UNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboards/lms',
    },
    {
        id: 'reports',
        title: 'Reports',
        //  subtitle: 'Define the masters',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [
            {
                id: 'reports.production',
                title: 'Production',
                type: 'basic',
                icon: 'heroicons_outline:view-grid',
                link: '/reports/report/production',
            },
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/reports/report/dispatch'
            },
            {
                id: 'reports.return',
                title: 'Return',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/reports/report/return'
            },
            {
                id: 'reports.audit.level.0',
                title: 'Audit',
                icon: 'heroicons_outline:calculator',
                type: 'collapsable',
                children: [
                    {
                        id: 'reports.audit.level.0.1-1',
                        title: 'Distributor',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/audit_distributor'
                    },
                   /*  {
                        id: 'reports.audit.level.0.1-2',
                        title: 'Dealer',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/audit_dealer'
                    } */
                ]
            },
          /*   {
                id: 'reports.consumption',
                title: 'Consumption',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/reports/report/'
            },
            {
                id: 'reports.ageing',
                title: 'Ageing',
                type: 'basic',
                icon: 'heroicons_outline:clock',
                link: '/reports/report/'
            },
            {
                id: 'reports.unmap',
                title: 'Unmap',
                type: 'basic',
                icon: 'heroicons_outline:paper-clip',
                link: '/reports/report/'
            },*/
            {
                id: 'reports.deviceGraph.level.0',
                title: 'Device Utilization Graph',
                type: 'collapsable',
                icon: 'heroicons_outline:chart-square-bar',               
                children: [
                    {
                        id: 'reports.deviceGraph.level.0.1-1',
                        title: 'Dispatch',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/deviceGraph'
                    },
                    {
                        id: 'reports.audit.deviceGraph.0.1-2',
                        title: 'Pipe to Bundle',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/deviceGraphPB'
                    }
                ]
            },
           /**/

        ]
    },


    {
        id: 'configuration',
        title: 'Configuration',
        type: 'group',
        icon: 'heroicons_outline:cog',
        children: [
            {
                id: 'configuration.plant',
                title: 'Plant Master',
                type: 'basic',
                icon: 'heroicons_outline:office-building',
                link: '/configuration/entity/1',
            },
            {
                id: 'configuration.production',
                title: 'Production Master',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/configuration/entity/production'
            },
            {
                id: 'configuration.depot',
                title: 'Depot Master',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/configuration/entity/2'
            },
            {
                id: 'configuration.distributor',
                title: 'Distributor Master',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/configuration/entity/3'
            },
           /*  {
                id: 'configuration.dealer',
                title: 'Dealer Master',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/configuration/entity/dealer'
            }, */
            {
                id: 'configuration.device',
                title: 'Device Master',
                type: 'basic',
                icon: 'heroicons_outline:device-mobile',
                link: '/configuration/entity/device'
            },
            {
                id: 'configuration.parts',
                title: 'Part Master',
                type: 'basic',
                icon: 'heroicons_outline:cog',
                link: '/configuration/entity/parts'
            },
            {
                id: 'configuration.users',
                title: 'User Master',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/configuration/entity/users'
            }
        ]
    },
    {
        id: 'android',
        title: 'Android Configuration',
        type: 'group',
        icon: 'heroicons_outline:device-mobile',
        children: [
            {
                id: 'android.device',
                title: 'Device Master',
                type: 'basic',
                icon: 'heroicons_outline:device-mobile',
                link: '/android/devices',
            },
            {
                id: 'android.events',
                title: 'Event Master',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/android/events'
            },
            {
                id: 'android.videos',
                title: 'Video Master',
                type: 'basic',
                icon: 'heroicons_outline:video-camera',
                link: '/android/videos'
            },
            {
                id: 'android.usp',
                title: 'USP Master',
                type: 'basic',
                icon: 'heroicons_outline:information-circle',
                link: '/android/usp'
            },
            {
                id: 'android.contacts',
                title: 'Contact Master',
                type: 'basic',
                icon: 'heroicons_outline:identification',
                link: '/android/contacts'
            }
        ]
    },
    {
        id: 'utility',
        title: 'Utilities',
        type: 'group',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'utility.bundle',
                title: 'Bundle QR',
                type: 'basic',
                icon: 'heroicons_outline:qrcode',
                link: '/utilities/bundles',
            },
            {
                id: 'utility.pipes',
                title: 'Pipe QR',
                type: 'basic',
                icon: 'heroicons_outline:qrcode',
                link: 'utilities/pipes'
            },
            {
                id: 'utility.delete',
                title: 'Delete',
                type: 'basic',
                icon: 'heroicons_outline:trash',
                link: '/utilities/delete'
            }
        ]
    }
];
export const horizontalNavigation: P4UNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboards/TRA',
    },
    {
        id: 'reports',
        title: 'Reports',
        //  subtitle: 'Define the masters',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [
            {
                id: 'reports.production',
                title: 'Production',
                type: 'basic',
                icon: 'heroicons_outline:view-grid',
                link: '/reports/report/production',
            },
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/reports/report/dispatch'
            },
            {
                id: 'reports.return',
                title: 'Return',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/reports/report/return'
            },
            {
                id: 'reports.audit.level.0',
                title: 'Audit',
                icon: 'heroicons_outline:calculator',
                type: 'collapsable',
                children: [
                    {
                        id: 'reports.audit.level.0.1-1',
                        title: 'Distributor',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/audit_distributor'
                    },
                   /*  {
                        id: 'reports.audit.level.0.1-2',
                        title: 'Dealer',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/audit_dealer'
                    } */
                ]
            },
          /*   {
                id: 'reports.consumption',
                title: 'Consumption',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/reports/report/'
            },
            {
                id: 'reports.ageing',
                title: 'Ageing',
                type: 'basic',
                icon: 'heroicons_outline:clock',
                link: '/reports/report/'
            },
            {
                id: 'reports.unmap',
                title: 'Unmap',
                type: 'basic',
                icon: 'heroicons_outline:paper-clip',
                link: '/reports/report/'
            },*/
            {
                id: 'reports.deviceGraph.level.0',
                title: 'Device Utilization Graph',
                type: 'collapsable',
                icon: 'heroicons_outline:chart-square-bar',               
                children: [
                    {
                        id: 'reports.deviceGraph.level.0.1-1',
                        title: 'Dispatch',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/deviceGraph'
                    },
                    {
                        id: 'reports.audit.deviceGraph.0.1-2',
                        title: 'Pipe to Bundle',
                        type: 'basic',
                        icon: 'heroicons_outline:calculator',
                        link: '/reports/report/deviceGraphPB'
                    }
                ]
            },
            /*{
                id: 'reports.printLabel',
                title: 'Label Print',
                type: 'basic',
                icon: 'heroicons_outline:printer',
                link: '/reports/report/'
            }*/

        ]
    },


    {
        id: 'configuration',
        title: 'Configuration',
        type: 'group',
        icon: 'heroicons_outline:cog',
        children: [
            {
                id: 'configuration.plant',
                title: 'Plant Master',
                type: 'basic',
                icon: 'heroicons_outline:office-building',
                link: '/configuration/entity/1',
            },
            {
                id: 'configuration.production',
                title: 'Production Master',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/configuration/entity/production'
            },
            {
                id: 'configuration.depot',
                title: 'Depot Master',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/configuration/entity/2'
            },
            {
                id: 'configuration.distributor',
                title: 'Distributor Master',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/configuration/entity/3'
            },
           /*  {
                id: 'configuration.dealer',
                title: 'Dealer Master',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/configuration/entity/dealer'
            }, */
            {
                id: 'configuration.device',
                title: 'Device Master',
                type: 'basic',
                icon: 'heroicons_outline:device-mobile',
                link: '/configuration/entity/device'
            },
            {
                id: 'configuration.parts',
                title: 'Part Master',
                type: 'basic',
                icon: 'heroicons_outline:cog',
                link: '/configuration/entity/parts'
            },
            {
                id: 'configuration.users',
                title: 'User Master',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/configuration/entity/users'
            }
        ]
    },
    {
        id: 'android',
        title: 'Android Configuration',
        type: 'group',
        icon: 'heroicons_outline:device-mobile',
        children: [
            {
                id: 'android.device',
                title: 'Device Master',
                type: 'basic',
                icon: 'heroicons_outline:device-mobile',
                link: '/android/devices',
            },
            {
                id: 'android.events',
                title: 'Event Master',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/android/events'
            },
            {
                id: 'android.videos',
                title: 'Video Master',
                type: 'basic',
                icon: 'heroicons_outline:video-camera',
                link: '/android/videos'
            },
            {
                id: 'android.usp',
                title: 'USP Master',
                type: 'basic',
                icon: 'heroicons_outline:information-circle',
                link: '/android/usp'
            },
            {
                id: 'android.contacts',
                title: 'Contact Master',
                type: 'basic',
                icon: 'heroicons_outline:identification',
                link: '/android/contacts'
            }
        ]
    },
    {
        id: 'utility',
        title: 'Utilities',
        type: 'group',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'utility.bundle',
                title: 'Bundle QR',
                type: 'basic',
                icon: 'heroicons_outline:qrcode',
                link: '/utilities/bundles',
            },
            {
                id: 'utility.pipes',
                title: 'Pipe QR',
                type: 'basic',
                icon: 'heroicons_outline:qrcode',
                link: 'utilities/pipes'
            },
            {
                id: 'utility.delete',
                title: 'Delete',
                type: 'basic',
                icon: 'heroicons_outline:trash',
                link: '/utilities/delete'
            }
        ]
    }
];

// Menu items for Supervisor Role

export const defaultNavigationSupervisor: P4UNavigationItem[] = [

    {
        id: 'orders',
        title: 'Order Approval',      
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'orders.approve',
                title: 'Order Approval',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/supervisor/orders'
            },
            {
                id: 'orders.return',
                title: 'Return Order',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/supervisor/returns'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/reports/report/dispatch'
            },
            {
                id: 'reports.return',
                title: 'Return',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/reports/report/return'
            }
        ]
    }
];

export const compactNavigationSupervisor: P4UNavigationItem[] = [

    {
        id: 'orders',
        title: 'Order Approval',      
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'orders.approve',
                title: 'Order Approval',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/orders/approve'
            },
            {
                id: 'orders.return',
                title: 'Return Order',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/orders/return'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/reports/report/dispatch'
            },
            {
                id: 'reports.return',
                title: 'Return',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/reports/report/return'
            }
        ]
    }
];

export const futuristicNavigationSupervisor: P4UNavigationItem[] = [

    {
        id: 'orders',
        title: 'Order Approval',      
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'orders.approve',
                title: 'Order Approval',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/orders/approve'
            },
            {
                id: 'orders.return',
                title: 'Return Order',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/orders/return'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/reports/report/dispatch'
            },
            {
                id: 'reports.return',
                title: 'Return',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/reports/report/return'
            }
        ]
    }
];

export const horizontalNavigationSupervisor: P4UNavigationItem[] = [

    {
        id: 'orders',
        title: 'Order Approval',      
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'orders.approve',
                title: 'Order Approval',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/orders/approve'
            },
            {
                id: 'orders.return',
                title: 'Return Order',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/orders/return'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/reports/report/dispatch'
            },
            {
                id: 'reports.return',
                title: 'Return',
                type: 'basic',
                icon: 'heroicons_outline:arrow-circle-left',
                link: '/reports/report/return'
            }
        ]
    }
];


//Menu Items for Manager Role

export const defaultNavigationManager: P4UNavigationItem[] = [

    {
        id: 'reports',
        title: 'Reports',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:view-grid',
                link: '/reports/report/production'
            },
            {
                id: 'reports.return',
                title: 'Unmap',
                type: 'basic',
                icon: 'heroicons_outline:paper-clip',
                link: '/reports/report/unmap'
            }
        ]
    }
];

export const compactNavigationManager: P4UNavigationItem[] = [

    {
        id: 'reports',
        title: 'Reports',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:view-grid',
                link: '/reports/report/production'
            },
            {
                id: 'reports.return',
                title: 'Unmap',
                type: 'basic',
                icon: 'heroicons_outline:paper-clip',
                link: '/reports/report/unmap'
            }
        ]
    }
];

export const futuristicNavigationManager: P4UNavigationItem[] = [

    {
        id: 'reports',
        title: 'Reports',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:view-grid',
                link: '/reports/report/production'
            },
            {
                id: 'reports.return',
                title: 'Unmap',
                type: 'basic',
                icon: 'heroicons_outline:paper-clip',
                link: '/reports/report/unmap'
            }
        ]
    }
];

export const horizontalNavigationManager: P4UNavigationItem[] = [

    {
        id: 'reports',
        title: 'Reports',
        type: 'group',
        icon: 'heroicons_outline:document-report',
        children: [            
            {
                id: 'reports.dispatch',
                title: 'Dispatch',
                type: 'basic',
                icon: 'heroicons_outline:view-grid',
                link: '/reports/report/production'
            },
            {
                id: 'reports.return',
                title: 'Unmap',
                type: 'basic',
                icon: 'heroicons_outline:paper-clip',
                link: '/reports/report/unmap'
            }
        ]
    }
];


// Menu items for Sales Role

export const defaultNavigationsales: P4UNavigationItem[] = [

    {
        id: 'sales',
        title: 'Audit',      
        type: 'basic',
        icon: 'heroicons_outline:calculator',
        link: '/sales/sales/sales'        
    },
    /* {
        id: 'sales',
        title: 'Consumption View',      
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/consumption'        
    },*/
    {
        id: 'productivity',
        title: 'Productivity',
        type: 'group',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'productivity.events',
                title: 'Events',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/sales/sales/events',
            },
            {
                id: 'productivity.videos',
                title: 'Training Videos',
                type: 'basic',
                icon: 'heroicons_outline:video-camera',
                link: '/sales/sales/videos'
            }
            
        ]
    },
    {
        id: 'expertcorner',
        title: 'Expert Corner',
        type: 'group',
        icon: 'heroicons_outline:academic-cap',
        children: [
            {
                id: 'expertcorner.ausps',
                title: 'Ashirvad USPs',
                type: 'basic',
                icon: 'heroicons_outline:information-circle',
                link: '/sales/sales/ausps',
            },
            {
                id: 'expertcorner.support',
                title: 'Support',
                type: 'basic',
                icon: 'heroicons_outline:question-mark-circle',
                link: '/sales/sales/support'
            }
            
        ]
    }
    
];

export const compactNavigationsales: P4UNavigationItem[] = [

    {
        id: 'sales',
        title: 'Audit',      
        type: 'basic',
        icon: 'heroicons_outline:calculator',
        link: '/sales/sales/sales'        
    },
    /* {
        id: 'sales',
        title: 'Consumption View',      
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/consumption'        
    },*/
    {
        id: 'productivity',
        title: 'Productivity',
        type: 'group',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'productivity.events',
                title: 'Events',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/sales/sales/events',
            },
            {
                id: 'productivity.videos',
                title: 'Training Videos',
                type: 'basic',
                icon: 'heroicons_outline:video-camera',
                link: '/sales/sales/videos'
            }
            
        ]
    },
    {
        id: 'expertcorner',
        title: 'Expert Corner',
        type: 'group',
        icon: 'heroicons_outline:academic-cap',
        children: [
            {
                id: 'expertcorner.ausps',
                title: 'Ashirvad USPs',
                type: 'basic',
                icon: 'heroicons_outline:information-circle',
                link: '/sales/sales/ausps',
            },
            {
                id: 'expertcorner.support',
                title: 'Support',
                type: 'basic',
                icon: 'heroicons_outline:question-mark-circle',
                link: '/sales/sales/support'
            }
            
        ]
    }
    
];

export const futuristicNavigationsales: P4UNavigationItem[] = [

    {
        id: 'sales',
        title: 'Audit',      
        type: 'basic',
        icon: 'heroicons_outline:calculator',
        link: '/sales/sales/sales'        
    },
    /* {
        id: 'sales',
        title: 'Consumption View',      
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/consumption'        
    },*/
    {
        id: 'productivity',
        title: 'Productivity',
        type: 'group',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'productivity.events',
                title: 'Events',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/sales/sales/events',
            },
            {
                id: 'productivity.videos',
                title: 'Training Videos',
                type: 'basic',
                icon: 'heroicons_outline:video-camera',
                link: '/sales/sales/videos'
            }
            
        ]
    },
    {
        id: 'expertcorner',
        title: 'Expert Corner',
        type: 'group',
        icon: 'heroicons_outline:academic-cap',
        children: [
            {
                id: 'expertcorner.ausps',
                title: 'Ashirvad USPs',
                type: 'basic',
                icon: 'heroicons_outline:information-circle',
                link: '/sales/sales/ausps',
            },
            {
                id: 'expertcorner.support',
                title: 'Support',
                type: 'basic',
                icon: 'heroicons_outline:question-mark-circle',
                link: '/sales/sales/support'
            }
            
        ]
    }
    
];

export const horizontalNavigationsales: P4UNavigationItem[] = [

    {
        id: 'sales',
        title: 'Audit',      
        type: 'basic',
        icon: 'heroicons_outline:calculator',
        link: '/sales/sales/sales'        
    },
    /* {
        id: 'sales',
        title: 'Consumption View',      
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/consumption'        
    },*/
    {
        id: 'productivity',
        title: 'Productivity',
        type: 'group',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'productivity.events',
                title: 'Events',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/sales/sales/events',
            },
            {
                id: 'productivity.videos',
                title: 'Training Videos',
                type: 'basic',
                icon: 'heroicons_outline:video-camera',
                link: '/sales/sales/videos'
            }
            
        ]
    },
    {
        id: 'expertcorner',
        title: 'Expert Corner',
        type: 'group',
        icon: 'heroicons_outline:academic-cap',
        children: [
            {
                id: 'expertcorner.ausps',
                title: 'Ashirvad USPs',
                type: 'basic',
                icon: 'heroicons_outline:information-circle',
                link: '/sales/sales/ausps',
            },
            {
                id: 'expertcorner.support',
                title: 'Support',
                type: 'basic',
                icon: 'heroicons_outline:question-mark-circle',
                link: '/sales/sales/support'
            }
            
        ]
    }
    
];