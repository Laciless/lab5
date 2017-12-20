var emotion = 'norm';

$(document).ready(function () {
    if (localStorage.getItem('records')) {
        let savedRecords = JSON.parse(localStorage.getItem('records'));
        for (let i = 0; i < savedRecords.length; i++) {
            createRecord(
                savedRecords[i].date,
                savedRecords[i].text,
                savedRecords[i].emotion,
            )
        }
    }
});

$('.save').click(function() {
    let date = normalize(new Date());
    let text = $('textarea').val();

    if (!localStorage.getItem('records')) {
        localStorage.setItem('records', JSON.stringify([{date, text, emotion}]));
    } else {
        let savedRecords = JSON.parse(localStorage.getItem('records'));
        savedRecords.push({date, text, emotion});
        localStorage.setItem('records', JSON.stringify(savedRecords));
    }
    createRecord(date, text, emotion);

});

$('#happy').click(function (){
    emotion = 'happy';
    $('.emoji-select').removeClass('rounded-selection');
    $(this).addClass('rounded-selection');
});
$('#sad').click(function (){
    emotion = 'sad';
    $('.emoji-select').removeClass('rounded-selection');
    $(this).addClass('rounded-selection');
});
$('#norm').click(function (){
    emotion = 'norm';
    $('.emoji-select').removeClass('rounded-selection');
    $(this).addClass('rounded-selection');
});

function createRecord(date, text, emotion) {
    $('.record-container')
        .append($('<div></div>')
            .addClass('record')
            .append($('<div></div>')
                .addClass('record-head')
                .append($('<div></div>')
                    .addClass('date')
                    .html(date))
                .append($(`<img src="${emotion}.png"/>`)
                    .addClass('emoji'))
            ).append($('<div></div>')
                .addClass('record-text')
                .html(text))
        )
}

function normalize(date) {
    let year = date.getFullYear();
    let month = addPrevZero(date.getMonth() + 1);
    let day = addPrevZero(date.getDate());
    let hours = addPrevZero(date.getHours());
    let minutes = addPrevZero(date.getMinutes());
    return `${day}.${month}.${year} (${hours}: ${minutes})`;

}

function addPrevZero(number) {
    return `0${number}`.substr(-2);
}
