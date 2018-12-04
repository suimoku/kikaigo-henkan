var kanaMap = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し",
    "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は",
    "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り",
    "る", "れ", "ろ", "わ", "を", "ん"]

var lastKey

function init() {
    onChangeHex();
}

function convertHexToDecimal(hexSeq) {
    var decimal = new BigNumber(0);
    for (var i = 0; i < hexSeq.length; i++) {
        var hex = hexSeq.substr(hexSeq.length - 1 - i, 1);
        var hexValue = new BigNumber(parseInt(hex, 16));
        var base = new BigNumber(16).pow(i);
        var add = hexValue.multipliedBy(base);
        decimal = decimal.plus(add);
    }
    return decimal.toString(10);
}

function onChangeHex() {
    var hexSeq = document.getElementById("hex").value.toUpperCase();
    document.getElementById("hex").value = hexSeq;
    if (hexSeq.length == 0) {
        document.getElementById("hex_alert").innerText = "";
        document.getElementById("decimal").innerText = "";
        document.getElementById("kana").value = "";
        return;
    }
    if (!hexSeq.match(/^[0-9A-F]+$$/)) {
        document.getElementById("hex_alert").innerText = "0～9、A～Fのみ可";
        return;
    }
    document.getElementById("hex_alert").innerText = "";

    var decimalSeq = convertHexToDecimal(hexSeq);
    if (decimalSeq.length % 2 == 1) {
        decimalSeq = "0" + decimalSeq;
    }
    var kanaList = [];
    var decimalList = [];
    for (var i = 0; i < decimalSeq.length; i += 2) {
        var decimal = decimalSeq.substr(i, 2);
        decimalList.push(decimal)
        var kana = kanaMap[Number(decimal) - 1]
        if (!kana) {
            kana = "■"
        }
        kanaList.push(kana)
    }
    document.getElementById("decimal").innerText = decimalList.join(" ");
    var kanaSeq = kanaList.join("");
    document.getElementById("kana").value = kanaSeq
}

function onChangeKana() {
    var kanaSeq = document.getElementById("kana").value;
    if (kanaSeq.length == 0) {
        document.getElementById("kana_alert").innerText = "";
        document.getElementById("decimal").innerText = "";
        document.getElementById("hex").value = "";
        return;
    }
    if (!kanaSeq.match(/^[あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん]+$$/)) {
        document.getElementById("kana_alert").innerText = "あ～んのみ可";
        return;
    }
    document.getElementById("kana_alert").innerText = "";
    var decimalList = []
    for (var i = 0; i < kanaSeq.length; i++) {
        var kana = kanaSeq.substr(i, 1);
        console.log("kana=" + kana);
        for (var j = 0; j < kanaMap.length; j++) {
            if (kanaMap[j] == kana) {
                decimalList.push(('00' + (j + 1)).slice(-2));
                break;
            }
        }
    }
    var decimalSeq = decimalList.join("");
    var decimal = new BigNumber(decimalSeq);
    document.getElementById("hex").value = decimal.toString(16).toUpperCase();
}