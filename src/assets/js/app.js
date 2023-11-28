// /* Template Name: Techwind - Multipurpose Tailwind CSS Landing Page Template
//    Author: Shreethemes
//    Email: support@shreethemes.in
//    Website: https://shreethemes.in
//    Version: 1.4.0
//    Created: May 2022
//    File Description: Main JS file of the template
// */
//
//
// /*********************************/
// /*         INDEX                 */
// /*================================
//  *     01.  Loader               *
//  *     02.  Toggle Menus         *
//  *     03.  Active Menu          *
//  *     04.  Clickable Menu       *
//  *     05.  Back to top          *
//  *     06.  Feather icon         *
//  *     06.  DD Menu              *
//  *     06.  Active Sidebar Menu  *
//  *     07.  Contact us           *
//  *     08.  Wow Animation JS     *
//  ================================*/
//
//
// window.addEventListener('load', fn, false)
//
// //  window.onload = function loader() {
// function fn() {
// 	// Preloader
// 	if (document.getElementById('preloader')) {
// 		setTimeout(() => {
// 			document.getElementById('preloader').style.visibility = 'hidden';
// 			document.getElementById('preloader').style.opacity = '0';
// 		}, 350);
// 	}
// 	// Menus
// 	activateMenu();
// }
//
// //Menu
// /*********************/
// /* Toggle Menu */
//
// /*********************/
// function toggleMenu() {
// 	document.getElementById('isToggle').classList.toggle('open');
// 	let isOpen = document.getElementById('navigation')
// 	if (isOpen.style.display === "block") {
// 		isOpen.style.display = "none";
// 	} else {
// 		isOpen.style.display = "block";
// 	}
// };
// /*********************/
// /*    Menu Active    */
//
// /*********************/
// function getClosest(elem, selector) {
//
// 	// Element.matches() polyfill
// 	if (!Element.prototype.matches) {
// 		Element.prototype.matches =
// 			Element.prototype.matchesSelector ||
// 			Element.prototype.mozMatchesSelector ||
// 			Element.prototype.msMatchesSelector ||
// 			Element.prototype.oMatchesSelector ||
// 			Element.prototype.webkitMatchesSelector ||
// 			function (s) {
// 				let matches = (this.document || this.ownerDocument).querySelectorAll(s),
// 					i = matches.length;
// 				while (--i >= 0 && matches.item(i) !== this) {
// 				}
// 				return i > -1;
// 			};
// 	}
//
// 	// Get the closest matching element
// 	for (; elem && elem !== document; elem = elem.parentNode) {
// 		if (elem.matches(selector)) return elem;
// 	}
// 	return null;
//
// };
//
// function activateMenu() {
// 	let menuItems = document.getElementsByClassName("sub-menu-item");
// 	if (menuItems) {
//
// 		let matchingMenuItem = null;
// 		for (let idx = 0; idx < menuItems.length; idx++) {
// 			if (menuItems[idx].href === window.location.href) {
// 				matchingMenuItem = menuItems[idx];
// 			}
// 		}
//
// 		if (matchingMenuItem) {
// 			matchingMenuItem.classList.add('active');
//
//
// 			let immediateParent = getClosest(matchingMenuItem, 'li');
//
// 			if (immediateParent) {
// 				immediateParent.classList.add('active');
// 			}
//
// 			let parent = getClosest(immediateParent, '.child-menu-item');
// 			if (parent) {
// 				parent.classList.add('active');
// 			}
//
// 			let parent = getClosest(parent || immediateParent, '.parent-menu-item');
//
// 			if (parent) {
// 				parent.classList.add('active');
//
// 				let parentMenuitem = parent.querySelector('.menu-item');
// 				if (parentMenuitem) {
// 					parentMenuitem.classList.add('active');
// 				}
//
// 				let parentOfParent = getClosest(parent, '.parent-parent-menu-item');
// 				if (parentOfParent) {
// 					parentOfParent.classList.add('active');
// 				}
// 			} else {
// 				let parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
// 				if (parentOfParent) {
// 					parentOfParent.classList.add('active');
// 				}
// 			}
// 		}
// 	}
// }
//
// /*********************/
// /*  Clickable manu   */
// /*********************/
// if (document.getElementById("navigation")) {
// 	let elements = document.getElementById("navigation").getElementsByTagName("a");
// 	for (let i = 0, len = elements.length; i < len; i++) {
// 		elements[i].onclick = function (elem) {
// 			if (elem.target.getAttribute("href") === "javascript:void(0)") {
// 				let submenu = elem.target.nextElementSibling.nextElementSibling;
// 				submenu.classList.toggle('open');
// 			}
// 		}
// 	}
// }
// /*********************/
// /*   Menu Sticky     */
//
// /*********************/
// function windowScroll() {
// 	const navbar = document.getElementById("topnav");
// 	if (navbar != null) {
// 		if (
// 			document.body.scrollTop >= 50 ||
// 			document.documentElement.scrollTop >= 50
// 		) {
// 			navbar.classList.add("nav-sticky");
// 		} else {
// 			navbar.classList.remove("nav-sticky");
// 		}
// 	}
// }
//
// window.addEventListener('scroll', (ev) => {
// 	ev.preventDefault();
// 	windowScroll();
// })
// /*********************/
// /*    Back To TOp    */
// /*********************/
//
// window.onscroll = function () {
// 	scrollFunction();
// };
//
// function scrollFunction() {
// 	let mybutton = document.getElementById("back-to-top");
// 	if (mybutton != null) {
// 		if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
// 			mybutton.classList.add("block");
// 			mybutton.classList.remove("hidden");
// 		} else {
// 			mybutton.classList.add("hidden");
// 			mybutton.classList.remove("block");
// 		}
// 	}
// }
//
// function topFunction() {
// 	document.body.scrollTop = 0;
// 	document.documentElement.scrollTop = 0;
// }
//
// /*********************/
// /*  Active Sidebar   */
// /*********************/
// (function () {
// 	let current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
// 	;
// 	if (current === "") return;
// 	let menuItems = document.querySelectorAll('.sidebar-nav a');
// 	for (let i = 0, len = menuItems.length; i < len; i++) {
// 		if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
// 			menuItems[i].parentElement.className += " active";
// 		}
// 	}
// })();
//
// /*********************/
// /*   Feather Icons   */
// /*********************/
// feather.replace();
//
// /*********************/
// /*    DD Menu        */
// /*********************/
// let ddmenu = document.getElementsByClassName("dd-menu");
// for (let i = 0, len = ddmenu.length; i < len; i++) {
// 	ddmenu[i].onclick = function (elem) {
// 		elem.stopPropagation();
// 	}
// }
//
// /*********************/
// /*     Small Menu    */
// /*********************/
// try {
// 	let spy = new Gumshoe('#navmenu-nav a');
// } catch (err) {
//
// }
//
//
// try {
// 	function changeTheme(e) {
// 		e.preventDefault()
// 		const htmlTag = document.getElementsByTagName("html")[0]
//
// 		if (htmlTag.className.includes("dark")) {
// 			htmlTag.className = 'light'
// 		} else {
// 			htmlTag.className = 'dark'
// 		}
// 	}
//
// 	const switcher = document.getElementById("theme-mode")
// 	switcher?.addEventListener("click", changeTheme)
//
// 	const chk = document.getElementById('chk');
//
// 	chk.addEventListener('change', changeTheme);
// } catch (err) {
//
// }
//
// try {
// 	new WOW().init();
// } catch (error) {
//
// }
//
// 	function fadeIn() {
// 		let fade = document.getElementById("error-msg");
// 		let opacity = 0;
// 		let intervalID = setInterval(function () {
// 			if (opacity < 1) {
// 				opacity = opacity + 0.5
// 				fade.style.opacity = opacity;
// 			} else {
// 				clearInterval(intervalID);
// 			}
// 		}, 200);
// 	}
// } catch (error) {
//
// }
