window.onload = () => {
    'use strict';

       if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js');
    }
    pong = Game.start('game', Pong, {});
    setTimeout(function () {
        camStart();
    }, 100);
}

// sound
var applause;
var ping; // = new Audio("sounds/ping.wav");
var png; // = new Audio(("sounds/pong.wav");
var firsttime = true;

function PlaySound(s) {
    if (mute.checked)
        return;
    try {
        switch (s) {
            case 'applause':
                applause.play();
                break
            case 'ping':
                ping.play();
                break;
            case 'pong':
                png.play();
                break;
            case 'goal':
                // goal.play();
                break;
        }
    } catch (e) {};
}

function InitSounds() {
    if (firsttime) {
        applause = new Audio('sounds/applause.mp3');
        applause.volume = 0;
        applause.play();
        ping = new Audio('sounds/ping.wav');
        ping.volume = 0;
        ping.play();

        png = new Audio('sounds/pong.wav');
        png.volume = 0;
        png.play();

        goal = new Audio('sounds/goal.wav');
        goal.volume = 0;
        goal.play();
        setTimeout(function () {
            ping.pause();
            png.pause();
            goal.pause();
            applause.pause();
            applause.volume = 1;
            ping.volume = 1;
            png.volume = 1;
            goal.volume = 1;
        }, 50);

        firsttime = false;
    }
}


var canvas;
var splash;
var button;
var button1;
var button2;
var button3;
var inMenu = true;
var panel;
var panelvisible = false;
var settings;
var home;
var Winner;
var pong;
var mute = false;

function hideMenu() {
    splash.hidden = true;
    button.hidden = true;
    button1.hidden = true;
    button2.hidden = true;
    button3.hidden = true;
    settings.hidden = true;
    panel.hidden = true;
    inMenu = false;
    home.hidden = false;
}

function showMenu() {
    // also stop game playing
    splash.hidden = false;
    button.hidden = false;
    button1.hidden = false;
    button2.hidden = false;
    button3.hidden = false;
    settings.hidden = false;
    panel.hidden = false;
    home.hidden = true;
    Winner.hidden = true;
    inMenu = true;
    pong.stop();
    pong.runner.stop();
}

function slideTo(el, left) {
    var steps = 10;
    var timer = 25;
    var elLeft = parseInt(el.style.left) || 0;
    var diff = left - elLeft;
    var stepSize = diff / steps;
    console.log(stepSize, ", ", steps);

    function step() {
        elLeft += stepSize;
        el.style.left = elLeft + "vw";
        if (--steps) {
            setTimeout(step, timer);
        }
    }
    step();
}

StoreValue = function (key, value) {
    if (window.localStorage) {
        window.localStorage.setItem(key, value);
    }
};

RetrieveValue = function (key, defaultValue) {
    var got;
    try {
        if (window.localStorage) {
            got = window.localStorage.getItem(key);
            if (got == 0) {
                return got;
            }
            if (got == "") {
                return got;
            }
            if (got == "false")
                return false;
            if (got) {
                return got;
            }
            return defaultValue;
        }
        return defaultValue;
    } catch (e) {
        return defaultValue;
    }
};

var ball;
var paddle;
var speed;
var s1;
var s2;
var s3;
var s4;
var restart;

function Restart(i) {
    if (mute.checked == false)
        applause.play();
    restart = setTimeout(function () {
        if (inMenu)
            return;
        Winner.hidden = true;
        Start(i);
    }, 6000);
}

function Start(i) {
    InitSounds();
    hideMenu();
    Pong.Defaults.ballRadius = 5 + ball.value * 6;
    Pong.Defaults.sound = false;
    Pong.Defaults.paddleHeightL = paddle.value * 80;
    Pong.Defaults.paddleHeightR = paddle.value * 80;
    Pong.Defaults.ballSpeed = 6 - parseInt(speed.value);
    Pong.Defaults.sound = mute;
    if (s1.checked)
        Pong.Defaults.singleSwitch = 1;
    else
        Pong.Defaults.singleSwitch = 0;
    if (s4.checked)
        Pong.Defaults.holdSwitch = 1;
    else
        Pong.Defaults.holdSwitch = 0;

    if (i == 1)
        Pong.Colors.ball = 'black';
    else
        Pong.Colors.ball = 'yellow';
    Pong.Colors.rightpaddle = 'white';
    Pong.Colors.leftpaddle = 'yellow';
    switch (i) {
        case 0:
            Pong.Colors.leftpaddle = 'white';
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            Pong.Colors.rightpaddle = 'yellow';
            break;
    }
    setTimeout(function () {
        setItems();
        switch (i) {
            case 0:
                pong.startDemo();
                setItems();
                break;
            case 1:
                // just move bat
                pong.startSinglePlayer();
                setTimeout(function () {
                    pong.stop();
                    // pong.runner.stop();
                    setItems();
                }, 100);
                break;
            case 2:
                pong.startSinglePlayer();
                setItems();
                break;
            case 3:
                pong.startDoublePlayer();
                setItems();
                break;
        }
    }, 200);
}

function setItems() {
    pong.leftPaddle.height = Pong.Defaults.paddleHeightL;
    pong.leftPaddle.color = Pong.Colors.leftpaddle;
    pong.rightPaddle.color = Pong.Colors.rightpaddle;
    pong.rightPaddle.height = Pong.Defaults.paddleHeightR;
    pong.ball.radius = Pong.Defaults.ballRadius;
    pong.ball.speed = Pong.Defaults.width / Pong.Defaults.ballSpeed;
}



function camStart() {
    pong.runner.stop();
    splash = document.querySelector('splash');
    canvas = document.getElementById('game');
    panel = document.querySelector('panel');
    settings = document.querySelector('settings');
    home = document.querySelector('home');
    Winner = document.querySelector('winner');
    button = document.querySelector('button');
    button1 = document.querySelector('button1');
    button2 = document.querySelector('button2');
    button3 = document.querySelector('button3');

    panel.style.left = "130vw";
    slideTo(panel, 130);

    mute = document.createElement("INPUT");
    mute.style.position = "absolute";
    mute.style.height = "3vh";
    mute.style.width = "3vw";
    mute.style.left = "16vw";
    mute.style.top = "3vh";
    mute.checked = false;
    mute.setAttribute("type", "checkbox");
    mute.checked = false;
    speed = document.createElement("INPUT");
    speed.setAttribute("type", "range");
    speed.style.position = "absolute";
    speed.style.height = "2vh";
    speed.style.width = "15vw";
    speed.style.left = "4vw";
    speed.style.top = "9vh";
    speed.style.color = 'green';
    speed.value = 3;
    speed.min = 1;
    speed.max = 5;
    paddle = document.createElement("INPUT");
    paddle.setAttribute("type", "range");
    paddle.style.position = "absolute";
    paddle.style.height = "2vh";
    paddle.style.width = "15vw";
    paddle.style.left = "4vw";
    paddle.style.top = "13vh";
    paddle.style.color = 'green';
    paddle.value = 3;
    paddle.min = 1;
    paddle.max = 5;
    ball = document.createElement("INPUT");
    ball.setAttribute("type", "range");
    ball.style.position = "absolute";
    ball.style.height = "2vh";
    ball.style.width = "15vw";
    ball.style.left = "4vw";
    ball.style.top = "17vh";
    ball.style.backgroundColor = 'green';
    ball.value = 3;
    ball.min = 1;
    ball.max = 5;

    s1 = document.createElement("INPUT");
    s1.style.position = "absolute";
    s1.style.height = "3vh";
    s1.style.width = "3vw";
    s1.style.left = "1.5vw";
    s1.style.top = "21vh";
    s2 = document.createElement("INPUT");
    s2.style.position = "absolute";
    s2.style.height = "3vh";
    s2.style.width = "3vw";
    s2.style.left = "1.5vw";
    s2.style.top = "25vh";
    s3 = document.createElement("INPUT");
    s3.style.position = "absolute";
    s3.style.height = "3vh";
    s3.style.width = "3vw";
    s3.style.left = "13vw";
    s3.style.top = "21vh";
    s4 = document.createElement("INPUT");
    s4.style.position = "absolute";
    s4.style.height = "3vh";
    s4.style.width = "3vw";
    s4.style.left = "13vw";
    s4.style.top = "25vh";
    s1.setAttribute("type", "radio");
    s2.setAttribute("type", "radio");
    s3.setAttribute("type", "radio");
    s4.setAttribute("type", "radio");

    s2.checked = true;
    s4.checked = true;

    function switchOption(i) {
        switch (i) {
            case 1:
                s1.checked = true;
                s2.checked = false;
                break;
            case 2:
                s2.checked = true;
                s1.checked = false;
                break;
            case 3:
                s3.checked = true;
                s4.checked = false;
                break;
            case 4:
                s4.checked = true;
                s3.checked = false;
                break;
        }
    }

    s1.onclick = function (e) {
        switchOption(1);
    }
    s2.onclick = function (e) {
        switchOption(2);
    }
    s3.onclick = function (e) {
        switchOption(3);
    }
    s4.onclick = function (e) {
        switchOption(4);
    }

    panel.appendChild(mute);
    panel.appendChild(speed);
    panel.appendChild(paddle);
    panel.appendChild(ball);
    panel.appendChild(s1);
    panel.appendChild(s2);
    panel.appendChild(s3);
    panel.appendChild(s4);

    settings.style.left = "92vw";
    mute.checked = RetrieveValue("mute", false);
    speed.value = RetrieveValue("speed", 3);
    paddle.value = RetrieveValue("paddle", 3);
    ball.value = RetrieveValue("ball", 3);
    if (RetrieveValue("oneSwitch", 0) == 1) {
        s1.checked = true;
        s2.checked = false;
    } else {
        s2.checked = true;
        s1.checked = false;
    }
    if (RetrieveValue("holdSwitch", 1) == 1) {
        s3.checked = true;
        s4.checked = false;
    } else {
        s4.checked = true;
        s3.checked = false;
    }

    function saveSettings() {
        StoreValue("mute", mute.checked);
        StoreValue("speed", speed.value);
        StoreValue("paddle", paddle.value);
        StoreValue("ball", ball.value);
        if (s1.checked)
            StoreValue("oneSwitch", 1);
        else
            StoreValue("oneSwitch", 0);
        if (s3.checked)
            StoreValue("holdSwitch", 1);
        else
            StoreValue("holdSwitch", 0);
    }

    settings.onclick = function (e) { // speed, paddle size, ball size
        if (panelvisible) { // save stored values
            slideTo(panel, 130);
            slideTo(settings, 92);
            saveSettings();
        } else {
            slideTo(panel, 75);
            slideTo(settings, 78);
        }
        panelvisible = !panelvisible;
    }

    home.onmousedown = function (e) {
        event.preventDefault();
        showMenu();;
    }
    home.hidden = true;

    button.onmousedown = function (e) {
        event.preventDefault();
        Start(0);
    }
    button1.onmousedown = function (e) {
        event.preventDefault();
        Start(1);
    }
    button2.onmousedown = function (e) {
        event.preventDefault();
        Start(2);
    }
    button3.onmousedown = function (e) {
        event.preventDefault();
        Start(3);
    }
    document.onkeydown = function (e) {
        if (e.keyCode == 27) {
            event.preventDefault();
            showMenu();
            clearInterval(restart);
        }
    }

    document.onmousedown = function (e) {
        if (inMenu)
            return;
        if (e.x < window.innerWidth / 2)
            pong.leftPaddle.setY(Pong.Defaults.height * e.y / window.innerHeight - Pong.Defaults.paddleHeightL / 2);
        else
            pong.rightPaddle.setY(Pong.Defaults.height * e.y / window.innerHeight - Pong.Defaults.paddleHeightL / 2);
    }

    document.onmousemove = function (e) {
        if (inMenu)
            return;
        if (e.buttons > 0) {
            if (e.x < window.innerWidth / 2)
                pong.leftPaddle.setY(Pong.Defaults.height * e.y / window.innerHeight - Pong.Defaults.paddleHeightL / 2);
            else
                pong.rightPaddle.setY(Pong.Defaults.height * e.y / window.innerHeight - Pong.Defaults.paddleHeightL / 2);
        }
    }

    document.ontouchstart = function (e) {
        if (inMenu)
            return;
        console.log("T" + e.changedTouches); //
   if (e.touches[0].clientX < window.innerWidth / 2)
            pong.leftPaddle.setY(Pong.Defaults.height * e.touches[0].clientY / window.innerHeight - Pong.Defaults.paddleHeightL / 2);
        else
            pong.rightPaddle.setY(Pong.Defaults.height * e.touches[0].clientY / window.innerHeight - Pong.Defaults.paddleHeightL / 2);
    }

    document.ontouchmove = function (e) {
        if (inMenu)
            return;
        console.log("T" + e.changedTouches); //
        if (e.touches[0].clientX < window.innerWidth / 2)
            pong.leftPaddle.setY(Pong.Defaults.height * e.touches[0].clientY / window.innerHeight - Pong.Defaults.paddleHeightL / 2);
        else
            pong.rightPaddle.setY(Pong.Defaults.height * e.touches[0].clientY / window.innerHeight - Pong.Defaults.paddleHeightL / 2);
        if (e.touches.length > 1) {
            if (e.touches[1].clientX < window.innerWidth / 2)
                pong.leftPaddle.setY(Pong.Defaults.height * e.touches[1].clientY / window.innerHeight - Pong.Defaults.paddleHeightL / 2);
            else
                pong.rightPaddle.setY(Pong.Defaults.height * e.touches[1].clientY / window.innerHeight - Pong.Defaults.paddleHeightL / 2);
        }
    }

    function Highlight() {
        button.style.opacity = .7;
        button1.style.opacity = .7;
        button2.style.opacity = .7;
        button3.style.opacity = .7;

        switch (menuItem) {
            case 0:
                button.style.opacity = 1.;
                break;
            case 1:
                button1.style.opacity = 1.;
                break;
            case 2:
                button2.style.opacity = 1.;
                break;
            case 3:
                button3.style.opacity = 1.;
                break;
        }
    }

    var menuItem = 0;

    function showPressedButton(index) {
        console.log("Press: ", index);
        if (inMenu) {
            switch (index) {
                case 0: // A
                case 1: // B
                case 2: // X
                case 3: // Y
                    Start(menuItem);
                    break;
                case 12: // dup
                    if (menuItem > 1)
                        menuItem -= 2;
                    Highlight();
                    break;
                case 13: // ddown
                    if (menuItem < 2)
                        menuItem += 2;
                    Highlight();
                    break;
                case 14: // dleft
                    if (menuItem > 0)
                        menuItem--;
                    Highlight();
                    break;
                case 15: // dright
                    if (menuItem < 4)
                        menuItem++;
                    Highlight();
                    break;
            }
            console.log("Menu: ", menuItem);
        } else switch (index) {
            case 4: // LT
            case 0: // A left paddle up
            case 12: // dup
                if (Pong.Defaults.singleSwitch == 1) {
                    if (pong.direction == 1)
                        pong.leftPaddle.moveUp();
                    else
                        pong.leftPaddle.moveDown();
                } else
                if (!pong.leftPaddle.auto)
                    pong.leftPaddle.moveUp();
                break;
            case 6:
            case 7:
            case 9:
            case 11:
            case 16:
                break;

            case 1: // B left paddle down
            case 5: // Right Shoulder Down
            case 13: // ddown
                if (Pong.Defaults.singleSwitch == 1)
                    return;
                if (!pong.leftPaddle.auto)
                    pong.leftPaddle.moveDown();
                break;
            case 2: // X right paddle up
                if (!pong.rightPaddle.auto)
                    pong.rightPaddle.moveUp();
                break;
            case 3: // Y right paddle down
                if (!pong.rightPaddle.auto)
                    pong.rightPaddle.moveDown();
                break;
            case 10: // XBox
            case 8: //Menu
                showMenu();
                break;
            case 14: // dleft
                break;
            case 15: // dright
                break;
            default:
        }
    }

    function removePressedButton(index) {
        console.log("Releasd: ", index);
        if (!inMenu) switch (index) {
            case 4: // LT
            case 0: // A left paddle up
            case 12: // dup
                pong.direction = 1 - pong.direction;
                if (Pong.Defaults.holdSwitch == 1)
                    if (!pong.leftPaddle.auto)
                        pong.leftPaddle.stopMovingUp();
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 11:
            case 16:
                break;
            case 1: // B left paddle down
            case 13: // ddown
                if (Pong.Defaults.singleSwitch == 1)
                    return;
                if (Pong.Defaults.holdSwitch == 1)
                    if (!pong.leftPaddle.auto)
                        pong.leftPaddle.stopMovingDown();
                break;
            case 2: // X right paddle up
                if (!pong.rightPaddle.auto)
                    pong.rightPaddle.stopMovingUp();
                break;
            case 3: // Y right paddle down
                if (!pong.rightPaddle.auto)
                    pong.rightPaddle.stopMovingDown();
                break;
            case 10: // XBox
                showMenu();
                break;
            case 14: // dleft
                break;
            case 15: // dright
                break;
            default:
        }
    }

    var gpad;

    function getAxes() {
        if (!inMenu) {
            if (Math.abs(gpad.getAxis(1)) > .1) {
                pong.leftPaddle.setY(Pong.Defaults.height * (1 + gpad.getAxis(1)) / 2 - Pong.Defaults.paddleHeightL / 2);
            }
            if (Math.abs(gpad.getAxis(3)) > .1) {
                pong.rightPaddle.setY(Pong.Defaults.height * (1 + gpad.getAxis(3)) / 2 - Pong.Defaults.paddleHeightR / 2);
            }

        }

        setTimeout(function () {
            getAxes();
        }, 50);
    }

    gamepads.addEventListener('connect', e => {
        console.log('Gamepad connected:');
        console.log(e.gamepad);
        Highlight();
        gpad = e.gamepad;
        e.gamepad.addEventListener('buttonpress', e => showPressedButton(e.index));
        e.gamepad.addEventListener('buttonrelease', e => removePressedButton(e.index));
        //       e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, true),
        //            StandardMapping.Axis.JOYSTICK_LEFT);
        //        e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, false),
        //            StandardMapping.Axis.JOYSTICK_RIGHT);
        setTimeout(function () {
            getAxes();
        }, 50);
    });

    gamepads.addEventListener('disconnect', e => {
        console.log('Gamepad disconnected:');
        console.log(e.gamepad);
    });

    gamepads.start();
    setTimeout(function () {
        gconnect(true);
        setTimeout(function () {
            gbuttonrelease(1)
        }, 500);
    }, 50);
}
