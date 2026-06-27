// Content
const btn = document.getElementById('btn');
const container = document.getElementById('container');
btn.addEventListener('click', function(){
    container.style.animation = 'animateClose 1s forwards';
    container.addEventListener('animationend', function(){
        container.style.display = 'none';
    });
});

// Size

let size = 'random';
let color = 'mix';

const selectedBox = document.querySelector('.select-selected');
const items = document.querySelectorAll('.select-items div');
const selectItems = document.querySelector('.select-items');

const selectBtn = document.querySelector('.select-btn');
const selectContainer = document.querySelector('.size-select');

const mixedBox = document.querySelector('.mix-mixed');
const mixItems = document.querySelectorAll('.mix-items div');
const mixMixItems = document.querySelector('.mix-items');

const mixBtn = document.querySelector('.mix-btn');
const mixContainer = document.querySelector('.mix-select');



selectedBox.addEventListener('click', function(){
    if (!selectItems.classList.contains('openItems')) {
        if (!mixMixItems.classList.contains('closeItems')) {
            mixMixItems.classList.add('closeItems');
            setTimeout(() => {
                mixMixItems.classList.remove('openItems', 'closeItems')
            }, 600);
        }
        selectItems.classList.remove('closeItems');
        selectItems.classList.add('openItems');
    } else if (!selectItems.classList.contains('closeItems')) {
        selectItems.classList.add('closeItems');
        setTimeout(() => {
            selectItems.classList.remove('openItems', 'closeItems')
        }, 600);
    }
});
items.forEach(item => {
    item.addEventListener('click', function(e){
        size = e.target.getAttribute('data-value');

        selectItems.classList.add('closeItems');
        setTimeout(() => {
            selectItems.classList.remove('openItems', 'closeItems')
        }, 600);
        const selectedText = e.target.innerText;
        selectedBox.innerText = "Sẽ là những bông hoa: " + selectedText;
    });
});



selectBtn.addEventListener('click', function(){

    if (!selectContainer.classList.contains('open')) {
        selectContainer.classList.remove('close');
        selectContainer.classList.add('open');
    } else if (!selectContainer.classList.contains('close')) {
        selectContainer.classList.add('close');
        setTimeout(() => {
            selectContainer.classList.remove('open', 'close');
        }, 800); 
    }
})
// Mix

mixedBox.addEventListener('click', function(){
    if (!mixMixItems.classList.contains('openItems')) {
        if (!selectItems.classList.contains('closeItems')) {
            selectItems.classList.add('closeItems');
            setTimeout(() => {
                selectItems.classList.remove('openItems', 'closeItems')
            }, 600);
        }

        mixMixItems.classList.remove('closeItems');
        mixMixItems.classList.add('openItems');
    } else if (!mixMixItems.classList.contains('closeItems')) {
        mixMixItems.classList.add('closeItems');
        setTimeout(() => {
            mixMixItems.classList.remove('openItems', 'closeItems')
        }, 600);
    }
});
mixItems.forEach(item => {
    item.addEventListener('click', function(e){
        color = e.target.getAttribute('data-value');

        mixMixItems.classList.add('closeItems');
        setTimeout(() => {
            mixMixItems.classList.remove('openItems', 'closeItems')
        }, 600);
        const selectedText = e.target.innerText;
        mixedBox.innerText = "Vườn hoa:  " + selectedText;
    });
});



mixBtn.addEventListener('click', function(){

    if (!mixContainer.classList.contains('open')) {
        mixContainer.classList.remove('close');
        mixContainer.classList.add('open');
    } else if (!mixContainer.classList.contains('close')) {
        mixContainer.classList.add('close');
        setTimeout(() => {
            mixContainer.classList.remove('open', 'close');
        }, 800); 
    }
})



// Sun
sun = document.getElementById('sun');

// Canvas

/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canva1');
const ctx = canvas.getContext('2d');

let canvasPosition = { left: 0, top: 0 };
let topCanvas = 0;
let bodyWidth = 0;
let bodyHeight = 0;
function updateCanvas() {
    
    bodyWidth = document.body.clientWidth;
    bodyHeight = document.body.clientHeight;
    topCanvas = 0;

    if (bodyHeight/bodyWidth > 833/1672) {
        topCanvas = bodyHeight*263/833
    } else {
        topCanvas = bodyWidth*263/1672
    }

    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.floor(canvas.clientWidth * scale);
    canvas.height = Math.floor(canvas.clientHeight * scale);
    ctx.scale(scale, scale);
    canvasPosition = canvas.getBoundingClientRect();
    sun.style.height = `${topCanvas}px`;
};
updateCanvas();

window.addEventListener('resize', updateCanvas);

let flowers = [];

const truongthanhImage = new Image();
truongthanhImage.src = 'truongthanh_no1.png';

const duduaNo1Image = new Image()
duduaNo1Image.src = 'dudua_no1.png';

const duduaNo2Image = new Image();
duduaNo2Image.src = 'dudua_no2.png';

const truongthanhIvoryImage = new Image();
truongthanhIvoryImage.src = 'truongthanh_ivory.png';

const duduaIvoryImage = new Image()
duduaIvoryImage.src = 'dudua_ivory.png';


class Tulip {
    constructor(x, y, size) {
        switch (size) {
            case 'random':
                this.relativeSize = (Math.random()*120 + 210) / 3000;
                break;
            case 'XS':
                this.relativeSize = 200 / 3000;
                break;
            case 'S':
                this.relativeSize = 220 / 3000;
                break;
            case 'M':
                this.relativeSize = 250 / 3000;
                break;
            case 'L':
                this.relativeSize = 280 / 3000;
                break;
            case 'XL':
                this.relativeSize = 310 / 3000;
                break;
            case 'XXL':
                this.relativeSize = 350 / 3000;
                break;
        }
        this.relativeX = x/canvas.width;
        this.relativeY = y/canvas.height;

        this.frame = 0;

        this.spriteWidthTruongThanh = 468;
        this.spriteHeightTruongThanh = 468;
        this.maxFrameTruongThanh = 70;

        this.spriteWidthDuDua = 500;
        this.spriteHeightDuDua = 500;

        this.maxFrameDuDuaNo1 = 61;
        this.maxFrameDuDuaNo2 = 53;

        this.currentSpriteWidth = this.spriteWidthTruongThanh;
        this.currentSpriteHeight = this.spriteHeightTruongThanh;
        this.currentMaxFrame = this.maxFrameTruongThanh;
        this.currentImage = truongthanhImage;

        this.time = 0;
    }

    update(deltaTime, sharedFrame){

        if(this.currentImage === truongthanhImage){
            this.time += deltaTime;
            this.frame = Math.floor(this.time / 50);
            if (this.frame >= this.currentMaxFrame){

                this.currentImage = duduaNo1Image;
                this.currentMaxFrame = this.maxFrameDuDuaNo1;
                this.currentSpriteWidth = this.spriteWidthDuDua;
                this.currentSpriteHeight = this.spriteHeightDuDua;
                this.time = 0;
                this.frame = 0;
            }
        } else if (this.currentImage === duduaNo1Image) {


            if (this.frame >= 1) {  
                this.time += deltaTime;
                this.frame = Math.floor(this.time / 50);
                if (this.frame >= this.currentMaxFrame) {
                    this.currentImage = duduaNo2Image;
                    this.currentMaxFrame = this.maxFrameDuDuaNo2;
                    this.time = 0;
                    this.frame = 0;
                }
            } else if (sharedFrame === 46) {
                this.frame = 1;
                this.time = 50;
            }

        } else {
            this.time += deltaTime;
            this.frame = Math.floor(this.time / 50);
            if (this.frame >= this.currentMaxFrame) {
                this.time = 0;
                this.frame = 0;
            }
        }

    }
    draw(){
        ctx.drawImage(this.currentImage,
             this.frame * this.currentSpriteWidth, 0,
             this.currentSpriteWidth, this.currentSpriteHeight,
             Math.round(this.relativeX * canvas.width - this.relativeSize * (canvas.width + canvas.height) / 4),
             Math.round(this.relativeY * canvas.height - this.relativeSize * (canvas.width + canvas.height) / 2),
             Math.round(this.relativeSize * (canvas.width + canvas.height) / 2),
             Math.round(this.relativeSize * (canvas.width + canvas.height) / 2));
    }
};


class Tulip2 {
    constructor(x, y, size) {
        switch (size) {
            case 'random':
                this.relativeSize = (Math.random()*120 + 210) / 3000;
                break;
            case 'XS':
                this.relativeSize = 200 / 3000;
                break;
            case 'S':
                this.relativeSize = 220 / 3000;
                break;
            case 'M':
                this.relativeSize = 250 / 3000;
                break;
            case 'L':
                this.relativeSize = 280 / 3000;
                break;
            case 'XL':
                this.relativeSize = 310 / 3000;
                break;
            case 'XXL':
                this.relativeSize = 350 / 3000;
                break;
        }
        this.relativeX = x/canvas.width;
        this.relativeY = y/canvas.height;

        this.frame = 0;

        this.spriteWidthTruongThanh = 468;
        this.spriteHeightTruongThanh = 468;
        this.maxFrameTruongThanh = 70;

        this.spriteWidthDuDua = 500;
        this.spriteHeightDuDua = 500;

        this.maxFrameDuDua = 53;

        this.currentSpriteWidth = this.spriteWidthTruongThanh;
        this.currentSpriteHeight = this.spriteHeightTruongThanh;
        this.currentMaxFrame = this.maxFrameTruongThanh;
        this.currentImage = truongthanhIvoryImage;

        this.time = 0;
    }

    update(deltaTime, sharedFrame){

        if(this.currentImage === truongthanhIvoryImage){
            this.time += deltaTime;
            this.frame = Math.floor(this.time / 50);
            if (this.frame >= this.currentMaxFrame){

                this.currentImage = duduaIvoryImage;
                this.currentMaxFrame = this.maxFrameDuDua;
                this.currentSpriteWidth = this.spriteWidthDuDua;
                this.currentSpriteHeight = this.spriteHeightDuDua;
                this.time = 0;
                this.frame = 0;
            }
        } else {

            if (this.frame >= 1) {  
                this.time += deltaTime;
                this.frame = Math.floor(this.time / 50);
                if (this.frame >= this.currentMaxFrame) {
                    this.time = 0;
                    this.frame = 0;
                }
            } else if (sharedFrame === 0) {
                this.frame = 1;
                this.time = 50;
            }

        }
    }
    draw(){
        ctx.drawImage(this.currentImage,
             this.frame * this.currentSpriteWidth, 0,
             this.currentSpriteWidth, this.currentSpriteHeight,
             Math.round(this.relativeX * canvas.width - this.relativeSize * (canvas.width + canvas.height) / 4),
             Math.round(this.relativeY * canvas.height - this.relativeSize * (canvas.width + canvas.height) / 2),
             Math.round(this.relativeSize * (canvas.width + canvas.height) / 2),
             Math.round(this.relativeSize * (canvas.width + canvas.height) / 2));
    }
};


canvas.addEventListener('click', function(e){
    let positionX = e.clientX - canvasPosition.left;
    let positionY = e.clientY - canvasPosition.top;
    switch (color) {
        case 'mix':
            let randomNumber = Math.floor(Math.random()*2);
            if (randomNumber == 0) {
                flowers.push(new Tulip(positionX, positionY, size));
            } else {
                flowers.push(new Tulip2(positionX, positionY, size));        
            }
            break;
        case 'pink':
            flowers.push(new Tulip(positionX, positionY, size));
            break;
        case 'ivory':
            flowers.push(new Tulip2(positionX, positionY, size));        
            break;

    }

    flowers.sort((a, b) => a.relativeY - b.relativeY);

});

let isDragging = false;
canvas.addEventListener('mousedown', function(){
    isDragging = true;
});

let lastMoveTime = performance.now(); 
let moveTime = 0;

canvas.addEventListener('mousemove', function(e){
    if(isDragging === true){

        let currentTime = performance.now();
        let mouseDeltaTime = currentTime - lastMoveTime; 
        lastMoveTime = currentTime;
        moveTime += mouseDeltaTime;
        
        if (moveTime > 200){
            let positionX = e.clientX - canvasPosition.left;
            let positionY = e.clientY - canvasPosition.top;
            switch (color) {
                case 'mix':
                    let randomNumber = Math.floor(Math.random()*2);
                    if (randomNumber == 0) {
                        flowers.push(new Tulip(positionX, positionY, size));
                    } else {
                        flowers.push(new Tulip2(positionX, positionY, size));        
                    }
                    break;
                case 'pink':
                    flowers.push(new Tulip(positionX, positionY, size));
                    break;
                case 'ivory':
                    flowers.push(new Tulip2(positionX, positionY, size));        
                    break;

            }
            flowers.sort((a, b) => a.relativeY - b.relativeY);
            moveTime = 0;
        }
    }
});

canvas.addEventListener('mouseup', function(){
    isDragging = false;
});





let lastTime = 0;
let sharedTime = 0;
let sharedFrame = 0;
let deltaTime = 0;

function animate(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    sharedTime += deltaTime;
    sharedFrame = Math.floor(sharedTime / 50);
    if (sharedFrame >= 53){
        sharedFrame = 0;
        sharedTime = 0;
    };
    for (let i = 0; i < flowers.length; i++){
        if(flowers[i].relativeY * canvas.height < topCanvas) {
            flowers.splice(i, 1);
            i--;
        } else {
            flowers[i].update(deltaTime, sharedFrame);
            flowers[i].draw();
        }
    };
    requestAnimationFrame(animate);
}

animate(0);















