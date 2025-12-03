const slots = [
    {id: "img1", img: "img/1.png"},
    {id: "img11", img: "img/2.png"},
    {id: "img12", img: "img/3.png"},
    {id: "img2", img: "img/1.1.png"},
    {id: "img21", img: "img/1.2.png"},
    {id: "img22", img: "img/2.1.png"},
    {id: "img3", img: "img/2.2.png"},
    {id: "img31", img: "img/3.1.png"},
    {id: "img32", img: "img/3.2.png"}
];

const images = slots.map(s => s.img);

let user = prompt("Введіть ім'я:");
if (!user) user = "User";
document.getElementById("username").innerHTML = user;

let sproba = 1;
document.getElementById("sproba").innerText = `Спроба ${sproba} з 3`;

function spinAnimation() {
    let time = setInterval(() => {
        slots.forEach(slot => {
            let r = Math.floor(Math.random() * images.length);
            document.getElementById(slot.id).src = images[r];
        });
    }, 80);
    return time;
}

document.getElementById("generate").onclick = function () {
    if (sproba > 3) return;

    let anim = spinAnimation();

    setTimeout(() => {
        clearInterval(anim);

        let savefimg = [];
        for (let row = 0; row < 3; row++) {
            let massimg = [...images];
            let rowImg = [];
            for (let col = 0; col < 3; col++) {
                let index = Math.floor(Math.random() * massimg.length);
                rowImg.push(massimg[index]);
                massimg.splice(index, 1);
            }
            savefimg.push(rowImg);
        }

        let k = 0;
        slots.forEach(slot => {
            let r = Math.floor(k / 3);
            let c = k % 3;
            document.getElementById(slot.id).src = savefimg[r][c];
            k++;
        });

        let win =
            (savefimg[0][0] === savefimg[0][1] && savefimg[0][1] === savefimg[0][2]) ||
            (savefimg[1][0] === savefimg[1][1] && savefimg[1][1] === savefimg[1][2]) ||
            (savefimg[2][0] === savefimg[2][1] && savefimg[2][1] === savefimg[2][2]);

        if (win) {
            document.getElementById("message").innerHTML = "WINNER!!!";
            document.getElementById("generate").disabled = true;
            return;
        }

        sproba++;
        if (sproba <= 3) {
            document.getElementById("sproba").innerText = `Спроба ${sproba} з 3`;
        }

        if (sproba > 3) {
            document.getElementById("message").innerHTML = "LOSER!!!";
            document.getElementById("generate").disabled = true;
        }

    }, 1000);
};