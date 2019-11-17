var ul = document.querySelector('ul');
var land = localStorage.getItem('id');
var main_news = document.querySelector('.main_news')
var country = document.querySelector('.country h5')

if (land == null) {
    land = 'ua'
}
var lab = localStorage.getItem('type');

function change(params) {
    localStorage.setItem('type', params);
    location.reload()
}
if (lab == 'NEWS') {
    x = 0;
} else if (lab == 'HEALTH') {
    x = 1;
} else if (lab == 'Technology') {
    x = 2;
} else if (lab == 'FILMS') {
    x = 3;
} else if (lab == 'SPORT') {
    x = 4;
} else {
    x = 0;
}
var papa_sendwich = document.querySelector('.papa_sendwich')
var sandwich_panel = document.querySelector('.sandwich_panel')
var arr = [`https://newsapi.org/v2/top-headlines?country=${land}&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`, `https://newsapi.org/v2/top-headlines?country=${land}&category=health&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`, `https://newsapi.org/v2/top-headlines?country=${land}&category=technology&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`, `https://newsapi.org/v2/top-headlines?country=${land}&category=entertainment&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`, `https://newsapi.org/v2/top-headlines?country=${land}&category=sports&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`];
var show_block = document.querySelector('.show_block')
var li = document.querySelectorAll('li')
var x;
var urlType = arr[x];
if (urlType == null) {
    urlType = `https://newsapi.org/v2/top-headlines?country=${land}&apiKey=e9a1b84513034c50ba27c412f5a7cc6a`
}

document.addEventListener('DOMContentLoaded', loadTypes);
main_news.textContent = localStorage.getItem('type')
country.textContent = localStorage.getItem('id')
var line = [];

function loadTypes() {
    var req = new Request(urlType);
    fetch(req)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            object = data.articles;
            for (var key in object) {
                let title = object[key].title
                let urlImage = object[key].urlToImage
                let url = object[key].url
                let name = object[key].author
                let date = object[key].publishedAt
                line = object[key].urlToImage
                if (name == null) {
                    name = 'Anonymous'
                }
                if (urlImage == null) {
                    urlImage = 'img/oops-знамя-вектора-91620593.jpg'
                }

                document.querySelector('.content').insertAdjacentHTML('afterbegin', `<div class='col3 lg-4 md-6 sm-12 card'><img src="${urlImage}" alt="NOT FOUND COMMING SOON" class='card-img'><h3>${title}</h3><span>Автор: ${name}<br><small>${date}</small></span><a href='${url}'><button type="button" class="btn btn-info">ПОДРОБНЕЕ</button></a></div>`)

                document.querySelector('.img_list').insertAdjacentHTML('afterbegin', `<img src="${urlImage}" class='galery_img' alt="NOT FOUND COMMING SOON">`)
                var galery_img = document.querySelectorAll('.galery_img');
            }
            return galery_img.length;
        })
        .then((numb) => {

            var img_list = document.querySelector('.img_list');


            var z = 0;
            setInterval(function swype() {
                img_list.style.left = `-${z}px`;
                z++
                if (z >= 355 * numb) {
                    z = 0;
                }
                
            }
                , 20)
            //             galery.addEventListener('mouseenter', stop);
            //             function stop() {
            //             clearInterval(sw)
            // }
        })

    var pan = true;
    papa_sendwich.addEventListener('click', () => {
        if (pan == true) {

            sandwich_panel.style.left = '0px';
            pan = false;
        } else {
            sandwich_panel.style.left = '-2500px';
            pan = true;
        }
    })
}
class Dropdown {
    constructor(selector, options) {
        this.el = document.querySelector(selector);
        this.items = options.items;
        this.el.querySelector('.dropdown_label').textContent = this.items[0].label;
        this.el.addEventListener('click', event => {
            if (event.target.classList.contains('dropdown_label')) {
                if (this.el.classList.contains('open')) {
                    this.hide();
                } else {
                    this.show();
                }
            } else if (event.target.tagName.toLowerCase() === 'li') {
                this.select(event.target.dataset.id);
            }
        })
        const itemsHTML = this.items.map(i => {
            return `<li data-id="${i.id}">${i.label}</li>`
        }).join('<hr>')
        this.el.querySelector('.dropdown_menu').insertAdjacentHTML('afterbegin', itemsHTML)
    }
    select(id) {
        const item = this.items.find(i => i.id === id);
        this.el.querySelector('.dropdown_label').textContent = item.label;
        this.hide();
        localStorage.setItem('id', id);

        location.reload()
    }
    show() {
        this.el.classList.add('open');
    }
    hide() {
        this.el.classList.remove('open')
    }
}

const dropdown = new Dropdown('#dropdown', {
    items: [{
        label: 'Ukraine',
        id: 'ua'
    },
    {
        label: 'Russian',
        id: 'ru'
    },
    {
        label: 'USA',
        id: 'us'
    },
    {
        label: 'Poland',
        id: 'pl'
    },
    ]
})








