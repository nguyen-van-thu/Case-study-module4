

const time = moment();

$(function () {
    showTimeOnline();
})

function showTimeOnline() {
    let now = time.format('LLLL');
    console.log(now);
    let html = `<p>${now}</p>`;
    $('#ViewTime').html(html);
}