(function () {
	'use strict;';

	interface Post {
		id: number;
		title: string;
		body: string;
	}

	// Elements
	const postsElem = document.querySelector('.posts') as HTMLElement;
	const inputElem = document.querySelector('.input') as HTMLInputElement;
	const loader = document.querySelector('.loader') as HTMLElement;

	let page = 1;
	const baseURL = 'https://jsonplaceholder.typicode.com/posts?_limit=5&_page=';
	const posts = [];

	async function fetchPosts() {
		const data = await fetch(baseURL + page);
		return await data.json();
	}

	async function updatePosts() {
		try {
			const newPosts = await fetchPosts();
			posts.concat(newPosts);
			populateUI(newPosts);
		} catch (error) {
			console.log(error);
		}
	}

	function filterPosts(e) {
		const term = e.target.value.trim().toLowerCase();
		const posts = document.querySelectorAll('.post');

		posts.forEach((post: HTMLDivElement) => {
			const title = post.querySelector('.post__title') as HTMLElement;
			const content = post.querySelector('.post__content') as HTMLElement;

			if (title.innerText.includes(term) || content.innerText.includes(term)) {
				post.style.display = 'block';
			} else {
				post.style.display = 'none';
			}
		});
	}

	function handleLoading() {
		loader.classList.add('show');
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				loader.classList.remove('show');
				resolve(true);
			}, 1000);
		});
	}

	function populateUI(posts: Post[]) {
		let postsHTML = '';
		posts.forEach((post) => {
			postsHTML += `
                <div class="post">
                    <span class="number">${post.id}</span>
                    <h2 class="post__title">${post.title}</h2>
                    <p class="post__content">${post.body}</p>
                </div>
            `;
		});
		postsElem.insertAdjacentHTML('beforeend', postsHTML);
	}

	// Initial Posts
	updatePosts();

	// Handle scroll
	document.addEventListener('scroll', () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

		if (scrollTop + clientHeight >= scrollHeight - 5) {
			handleLoading().then(() => {
				setTimeout(() => {
					page++;
					updatePosts();
				});
			});
		}
	});

	inputElem.addEventListener('input', filterPosts);
})();
