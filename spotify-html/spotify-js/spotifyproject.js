let onlysong = []
let total_song_number = null
let newsongname = []
let song = []
async function songs(params) {
    // console.log('hi');
    let response = await fetch('http://127.0.0.1:7000/spotify-html/songs/');
    console.log('thi is respone ',response);
    
    let data = await response.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, 'text/html')
    let table = doc.querySelector('tbody')
    let rows = table.querySelectorAll('tr')
    rows.forEach((element) => {
        let cells = element.querySelectorAll('td');
        // console.log(cells);
        if (cells.length > 1) {
            let songName = cells[0].innerText;
            newsongname = songName.replace('.mp3', '')
            let songLinkElement = cells[0].querySelector('a');
            let songLink = songLinkElement ? songLinkElement.href : 'No link';
            song.push({ song: newsongname, link: songLink })
            onlysong.push(songLink)
        }
    })
    console.log('this is song');
    console.log(onlysong);
    total_song_number = onlysong.length;
    // let audio = new Audio(onlysong[1])
    // // audio.play()
}
songs()

async function Artist_profile() {
    let response = await fetch('http://127.0.0.1:7000/spotify-html/Artist-profile/')
    let data = await response.text()
    // console.log(data);
    let parser = new DOMParser()
    let doc = parser.parseFromString(data, "text/html")
    let table = doc.querySelector('tbody')
    let rows = table.querySelectorAll('tr')
    // console.log(rows);
    rows.forEach(async (element) => {
        let cells = element.querySelector('td a')
        if (cells && cells.textContent !== '../') {
            let artist_name = cells.innerText
            let path = cells.getAttribute('href');
            let artist_name2 = artist_name.replaceAll('/', '')
            console.log(artist_name2);
            let path2 = path.replaceAll('\\', '/')
            const imageFormats = ["jpg", "jpeg", "png", "webp"];
            let artist_image = []
            let artist_image1 = []
            for (let index = 0; index < imageFormats.length; index++) {
                const element = imageFormats[index];
                let path3 = `..${path2}artist-photo/${artist_name2}.${element}`
                try {
                    let response = await fetch(path3, { method: "head" })
                    if ((await response).ok) {
                        artist_image = path3
                        artist_image1.push(artist_image)
                    }
                }
                catch (error) {

                    // else {
                    //     // console.log(`Please save the image name as Artist-name OR Folder or img name don't matched ${(await response).status}`);
                    // }

                }
            }
            artist_image1.forEach((element) => {
                let div2 = document.querySelector('.Artists-profile .for-artist-img')
                let div = document.createElement('div')
                div.classList.add('image-wrapper')
                let img = document.createElement('img')
                img.src = element
                img.alt = 'Image'
                img.classList.add('artist-image')
                let span = document.createElement('span')
                let artist_name = artist_name2.replace('-', ' ')
                span.innerText = artist_name
                span.style.whiteSpace = 'nowrap'
                div.append(img, span)
                div2.append(div)
                span.addEventListener("mouseover", function () {
                    this.style.textDecoration = "underline"; // Change text color when hovered
                });
                span.addEventListener("mouseout", function () {
                    this.style.textDecoration = "none";
                });
                div.addEventListener('click', () => showFullScreen(element, artist_name))
            })
        }
    })
}

Artist_profile()

async function artist_profile_for_rightpart() {
    let response = await fetch('http://127.0.0.1:7000/spotify-html/artist-profile-for-rightpart/')
    let data = await response.text()
    // console.log(data);
    let parser = new DOMParser()
    let doc = parser.parseFromString(data, "text/html")
    let table = doc.querySelector('tbody')
    let rows = table.querySelectorAll('tr')
    // console.log(rows);
    rows.forEach(async (element) => {
        let cells = element.querySelector('td a')
        if (cells && cells.textContent !== '../') {
            let artist_name = cells.innerText
            let path = cells.getAttribute('href');
            let artist_name2 = artist_name.replaceAll('/', '')
            // console.log(artist_name2);
            let path2 = path.replaceAll('\\', '/')
            const imageFormats = ["jpg", "jpeg", "png", "webp"];
            let artist_image = []
            let artist_image1 = []
            for (let index = 0; index < imageFormats.length; index++) {
                const element = imageFormats[index];
                let path3 = `..${path2}artist-photo/${artist_name2}.${element}`
                try {
                    let response = fetch(path3, { method: "head" })
                    if ((await response).ok) {
                        artist_image = path3
                        artist_image1.push(artist_image)

                    }
                }
                catch (error) {
                    //   else {
                    //     console.log(`Please save the image name as Artist-name OR Folder or img name don't matched ${(await response).status}`);
                    // }
                }

            }
            artist_image1.forEach((element) => {
                let div = document.createElement('div')
                div.classList.add('image-wrapper', 'image-wrapper2')
                let img = document.createElement('img')
                img.src = element
                img.alt = 'Image'
                img.classList.add('artist-image2')
                let span = document.createElement('span')
                let artist_name = artist_name2.replace('-', ' ')
                span.innerText = artist_name
                span.style.whiteSpace = 'nowrap'
                div.append(img, span)
                div2 = document.querySelector('.grid-container-for-artist')
                div2.append(div)
                span.addEventListener("mouseover", function () {
                    this.style.textDecoration = "underline"; // Change text color when hovered
                });
                span.addEventListener("mouseout", function () {
                    this.style.textDecoration = "none";
                });
                div.addEventListener('click', () => showFullScreen(element, artist_name))
            })
        }
    })
}
artist_profile_for_rightpart()

async function song_list(fetchUrl, targetDivSelector) {
    let response = await fetch(fetchUrl);
    let data = await response.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/html");
    let table = doc.querySelector('tbody');
    let rows = table.querySelectorAll('tr');
    // let artistname=null

    rows.forEach(async (element) => {
        let cells = element.querySelector('td a');
        if (cells && cells.textContent !== '../') {
            let artist_name = cells.innerText.trim();
            let path = cells.getAttribute('href');
            let artist_name2 = artist_name.replaceAll('/', '');
            // artistname=artist_name2
            let path2 = path.replaceAll('\\', '/');
            const imageFormats = ["jpg", "jpeg", "png", "webp"];
            let artist_image = null;

            for (let index = 0; index < imageFormats.length; index++) {
                let imagePath = `..${path2}artist-photo/${artist_name2}.${imageFormats[index]}`;
                try {
                    let response = await fetch(imagePath, { method: "HEAD" });
                    if (response.ok) {
                        artist_image = imagePath;
                        break; // Stop checking after finding the first valid image
                    }
                } catch (error) {
                    console.warn(`Image not found: ${imagePath}`);
                }
            }

            if (artist_image) {
                let div = document.querySelector(targetDivSelector);
                let img = document.createElement('img');
                img.src = artist_image;
                img.alt = 'Artist Image';
                img.classList.add('artist-image3');

                let div2 = document.createElement('a');
                div2.innerText = artist_name2.replace('-', '');

                let div3 = document.createElement('div');
                div3.classList.add('song-list');
                div3.append(img, div2);

                let div4 = document.createElement('div');
                div4.classList.add('song-list-container');
                div4.append(div3);
                div.append(div4);
                div2.addEventListener("mouseover", function () {
                    this.style.textDecoration = "underline"; // Change text color when hovered
                });
                div2.addEventListener("mouseout", function () {
                    this.style.textDecoration = "none";
                });

                // Add click event listener to open full-screen view
                div3.addEventListener("click", () => showFullScreen(artist_image, artist_name2));
            }
        }
    });
}

// Function to show full-screen image & songs
function showFullScreen(imageSrc, artistName) {
    let main = document.createElement('div');
    main.classList.add('main');

    let overlay = document.createElement('div');
    let overlay2 = document.createElement('div');
    overlay.classList.add('fullscreen-overlay');
    overlay2.classList.add('fullscreen-overlay2');

    let img = document.createElement('img');
    img.src = imageSrc;
    img.classList.add('fullscreen-image');

    let artistInfoContainer = document.createElement('div');
    artistInfoContainer.classList.add('divforartist');

    let artistNameSpan = document.createElement('span');
    artistNameSpan.classList.add('nameartist');
    artistNameSpan.innerText = artistName;

    let spotifyContainer = document.createElement("div");
    spotifyContainer.classList.add('liked-songs-img');
    spotifyContainer.style.alignItems = 'center';
    let spotifyLogo = document.createElement('img');
    spotifyLogo.src = 'all-images\\spotify-icon.svg';
    spotifyLogo.style.height = "25px";
    spotifyLogo.style.width = "25px";

    let spotifyLabel = document.createElement('span');
    spotifyLabel.innerText = 'Spotify';

    spotifyContainer.append(spotifyLogo, spotifyLabel);
    let totalSongsSpan = document.createElement("span");
    totalSongsSpan.innerText = `Total Songs: ${total_song_number}`;
    let playlist = document.createElement('span');
    playlist.innerText = 'Playlist';
    playlist.style.fontSize = 'xxx-large'
    playlist.style.marginTop = '10px';

    // Append elements to the right side of the image
    artistInfoContainer.append(spotifyContainer, playlist, artistNameSpan, totalSongsSpan);
    overlay2.append(img, artistInfoContainer); // Image left, text right
    overlay.append(overlay2);

    let closeButton = document.createElement('button');
    closeButton.innerText = "Close";
    closeButton.classList.add('close-btn');
    closeButton.onclick = () => main.remove();
    main.append(closeButton);

    let song_list = document.createElement('div');
    song_list.classList.add('song-list2');

    let ul = document.createElement('ul');
    ul.classList.add('grid-section');

    let play = new Audio()
    song.forEach((element, index) => {
        let li = document.createElement('li');
        li.innerText = `${index + 1}. `;

        let a = document.createElement('div');
        // a.href = element.link;
        a.innerText = element.song;
        a.classList.add('song-link');

        li.appendChild(a);
        ul.appendChild(li);
        // let play = new Audio(element.link)
        li.addEventListener('click', () => {
            let img = document.querySelector('.seekbar-img').getElementsByTagName('img')[1]
            img.src = 'all-images\\play.svg'
            img.alt = 'img'
            play.src = element.link;
            play.play();
            let img2 = document.querySelector('.seekbar-img').getElementsByTagName('img')[1]
            img2.replaceWith(img2.cloneNode(true))
            img2 = document.querySelector('.seekbar-img').getElementsByTagName('img')[1]

            img2.addEventListener('click', () => {
                if (play.paused) {
                    play.play();
                    img2.src = 'all-images\\play.svg';
                } else {
                    play.pause();
                    img2.src = 'pause.svg';
                }
            });
            let song_name = document.querySelector('.song-name');
            song_name.innerText = `Song:${element.song}`;
            let song_duration = document.querySelector('.song-duration')
            // let minutes = Math.floor(play.duration / 60);
            // let seconds = Math.floor(play.duration % 60);
            play.addEventListener('loadedmetadata', () => {
                let minutes = Math.floor(play.duration / 60);
                let seconds = Math.floor(play.duration % 60);
                song_duration.innerText = `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`
                setInterval(() => {
                    let minutes2 = Math.floor(play.currentTime / 60);
                    let seconds2 = Math.floor(play.currentTime % 60);
                    song_duration.innerText = `${minutes2}:${seconds2<10?0:''}${seconds2}` + ` / ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                }, 1000);

            });

        });
    })
    song_list.appendChild(ul);
    main.append(overlay);
    main.append(song_list);
    document.body.append(main);


}

song_list('http://127.0.0.1:7000/spotify-html/song-for-user/', '.made-for-username')
song_list('http://127.0.0.1:7000/spotify-html/song-for-user -2/', '.made-for-username2')
song_list('http://127.0.0.1:7000/spotify-html/song-for-user -3/', '.made-for-username3')
song_list('http://127.0.0.1:7000/spotify-html/song-for-user -4/', '.made-for-username4')
song_list('http://127.0.0.1:7000/spotify-html/song-for-user -5/', '.made-for-username5')
song_list('http://127.0.0.1:7000/spotify-html/song-for-user -7/', '.made-for-username6')
song_list('http://127.0.0.1:7000/spotify-html/song-for-user -8/', '.made-for-username7')
song_list('http://127.0.0.1:7000/spotify-html/song-for-user -9/', '.made-for-username8')
song_list('http://127.0.0.1:7000/spotify-html/song-for-user -6/', '.made-for-username9')
song_list('http://127.0.0.1:7000/spotify-html/song-for-user -10/', '.made-for-username10')
