/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if (
    'serviceWorker' in navigator
    && (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                    'service worker became redundant.');

              default:
                  // Ignore
              }
            };
          }
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here
  
  //Task 1 bacon cloning

  const baconCloner = document.querySelector('div#overview button') 
  if (baconCloner) {
    baconCloner.addEventListener('click', (event) => {
      const baconImg = document.querySelector('div#overview img[alt="Bacon"]');
      if (baconImg) {
        baconImg.parentNode.appendChild(baconImg.cloneNode());
      }
    })
  }


  //Task 3 form validation

  const form = document.forms["checkout"];
  const submitButton = form.querySelector(".checkout-button");
  submitButton.addEventListener("click", (e) => {
    let showErrorMessage = false;
    for (const field of form.elements) {
      if (field.tagName === "SELECT") continue;

      let result = true;
      if (["", null, undefined].includes(field.value)) {
        result = false;
      }

      if (result) {
        let re = /(.*?)/g;
        switch (field.name) {
          case "email":
            re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            break;
          case "postalCode":
            // Checking with regex fo US postal codes just e.g.
            re = /^\d{5}([\-]?\d{4})?$/;
            break;
          case "phoneNumber":
            re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
            break;
          case "creditCard":
            // I'm only testing for Visa cards, based on the image provided in checkout.png
            re = /^4[0-9]{12}(?:[0-9]{3})?$/;
            break;
          case "securityCode":
            re = /^\d\d\d/g;
            break;
          case "expirationDate":
            re = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
            break;
        }
        result = re.test(field.value);
      }

      const fieldWrapper = field.parentNode.parentNode;

      if (result) {
        fieldWrapper.classList.remove("custom-formfield--error");
      } else {
        showErrorMessage = true;
        fieldWrapper.classList.add("custom-formfield--error");
      }
    }
    if (showErrorMessage) {
      const snackbarContainer = document.querySelector("#snackbar-container");
      const data = { message: "Please fill required fields with valid values" };
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
  });
})();
