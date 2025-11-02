import { Injectable } from '@angular/core';
import { Feature, Statistic } from './welcome.types';

@Injectable({
    providedIn: 'root'
})
export class WelcomeService {
    getFeatures(): Feature[] {
        return [
            {
                icon: 'heroicons_outline:calendar',
                title: 'Cycle Tracking',
                description: 'Track and predict your menstrual cycles with intelligent, data-driven insights.',
                link: '/cycle-tracking'
            },
            {
                icon: 'heroicons_outline:heart',
                title: 'Symptom Monitoring',
                description: 'Monitor physical and emotional symptoms to better understand your health patterns.',
                link: '/symptoms'
            },
            {
                icon: 'heroicons_outline:book-open',
                title: 'Educational Resources',
                description: 'Access articles and tips to break taboos and foster menstrual health awareness.',
                link: '/education'
            }
        ];
    }

    getStatistics(): Statistic[] {
        return [
            { value: '50K+', label: 'Active Users' },
            { value: '2.5M+', label: 'Cycles Tracked' },
            { value: '95%', label: 'User Satisfaction' }
        ];
    }
}
