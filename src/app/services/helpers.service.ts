import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
@Injectable()

export class HelpersService {
	showReloadDialogEvent: EventEmitter<boolean>;

	updatedVersion = localStorage.getItem('version');

	constructor(private route: ActivatedRoute, private router: Router) {
		this.showReloadDialogEvent = new EventEmitter<boolean>();
	}

	goBack(): any {
		return this.router.navigate(['..'], {
			relativeTo: this.route
		});
	}

	dateToYYYYMMDD(value): any {
		const date = new Date(value);
		let month: any = date.getMonth() + 1;
		let day: any = date.getDate();
		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;
		return `${day}/${month}/${date.getFullYear()}`;
	}

	getYoutubeVideoId = (url) => {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		const match = url.match(regExp);

		if (match && match[2].length === 11) {
			return match[2];
		}
		return 'error';
	};

	getEmbedUrl = (url) => {
		const myId = this.getYoutubeVideoId(url.trim());
		return `https://www.youtube.com/embed/${myId}`;
	};

	containsOnlyNumber = (value) => {
		const regex = /^[0-9]*$/;
		return regex.test(value);
	};

	containsAlphaNumeric = (value) => {
		const regex = /^[a-zA-Z0-9]*$/;
		return regex.test(value);
	};
	debounce(func, wait, immediate?: any) {
		let timeout;
		return function executedFunction() {
			const context = this;
			const args = arguments;
			const later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	setItemLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	getItemLocalStorage(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	removeItemLocalStorage(key) {
		console.log("====removing keys -----", key)
		localStorage.removeItem(key);
	}

	removeItemsLocalStorage(keys) {
		keys.forEach((key) => localStorage.removeItem(key));
	}

	deleteAllItemsLocalStorage() {
		localStorage.clear();
	}

	showReloadDialog = () => {
		this.showReloadDialogEvent.emit(true);
	};

	updateVersion = (updatedVersion) => {
		this.updatedVersion = updatedVersion;
	};
	isDesktop = () => !/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

}
