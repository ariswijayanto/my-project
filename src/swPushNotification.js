/* eslint-disable no-restricted-globals */
// importScripts('https://www.gstatic.com/firebasejs/5.9.2/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/5.9.2/firebase-messaging.js');

import * as firebase from 'firebase';

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
	messagingSenderId: "657590055033"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

self.addEventListener('push', async event => {
	const db = await getDb();
	const tx = this.db.transaction('jokes', 'readwrite');
	const store = tx.objectStore('jokes');

	const data = event.data.json().data;
	data.id = parseInt(data.id);
	store.put(data);

	tx.oncomplete = async e => {
		// eslint-disable-next-line no-undef
		const allClients = await clients.matchAll({ includeUncontrolled: true });
		for (const client of allClients) {
			client.postMessage('newData');
		}
	};
});

async function getDb() {
	if (this.db) {
		return Promise.resolve(this.db);
	}

	return new Promise(resolve => {
		const openRequest = indexedDB.open("Chuck", 1);

		openRequest.onupgradeneeded = event => {
			const db = event.target.result;
			db.createObjectStore('jokes', { keyPath: 'id' });
		};

		openRequest.onsuccess = event => {
			this.db = event.target.result;
			resolve(this.db);
		}
	});
}

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
	const notificationTitle = 'Background Title (client)';
	const notificationOptions = {
		'body': 'Background Body (client)',
		'icon': '/mail.png',
		'click_action': 'google.com'
	};

	return self.registration.showNotification(notificationTitle,
		notificationOptions);
});


const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
	// '/index.html',
	// '/index.js',
	// '/mail.png',
	// '/mail2.png',
	// '/manifest.json'
];

self.addEventListener('install', event => {
	event.waitUntil(caches.open(CACHE_NAME)
		.then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				if (response) {
					return response;
				}
				return fetch(event.request);
			}
			)
	);
});