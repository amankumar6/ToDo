import '../sass/style.scss';

$(document).ready(function () {
    // baffel is for text reveal animation 
    const text = baffle('.user--quotes p');
    text.set({
        characters: '▓░▒ ▒/░▒░ ▓██░ /▓░ /▒█░> ▓░▓▒ ░<▓ █░█▒ /░██',
        speed: 60,
    });
    text.start();
    text.reveal(1200);

    // Materialize Initialization
    $('.modal').modal();
    $('.datepicker').datepicker();
    $('.timepicker').timepicker();
    $('.add--todo').click(() => $('.add--todo--form').trigger('reset'));
    $('.carousel').carousel({
        numVisible: 3,
        indicators: true
    });

    // listning for change event on checkbox
    $('.todo--checkbox').change(function () {
        let audio = document.querySelector('.audio');
        if (this.checked) audio.play();

        // posting the checkbox status in the API
        $.ajax({
            url: `/todo/${$(this).data('value')}`,
            type: 'POST',
            data: {
                done: this.checked
            },
            success: setTimeout(() => location.reload(), 200),
        });
    });

    // listning for click event for deleting the todo 
    $('.todo--delete').click(function () {
        $.ajax({
            url: `/deleteTodo/${$(this).data('del')}`,
            type: 'POST',
            success: setTimeout(() => location.reload(), 200),
        });
    });

    // $('.change-theme').click(() => {
    //     document.documentElement.style.setProperty('--bgColor', '#212425');
    //     document.documentElement.style.setProperty('--bgColor2', '#181A1B');
    //     document.documentElement.style.setProperty('--defaultTextColor', '#E8E6E3');
    //     document.documentElement.style.setProperty('--borderColor', '#3E4345');
    // });

    // hamBurger eventListner 
    $('.hamBurger').click(() => {
        $('.hamBurger').toggleClass('toggleCancel');
        $('.left--block').toggleClass('left--block--active');
    });

    // reloading the current time every minute 
    setInterval(() => $(".today--time").load(location.href + " .today--time"), 60000);

    // reloading date every hour
    setInterval(() => $("h5.header").load(location.href + " h5.header"), 3600000);
});

// fetching random quotes from API
$.get('https://api.quotable.io/random', (data) => {
    $('.random--quotes').text(data.content);
    $('.author').text(`- ${data.author}`);
    const [quotes, author] = [baffle('.random--quotes'), baffle('.author')],
    characters = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()',
        speed = 60;
    quotes.set({
        characters,
        speed
    });
    author.set({
        characters,
        speed
    });
    quotes.start();
    author.start();
    quotes.reveal(1000);
    author.reveal(1000);
    $('.thoughts').addClass('card-panel');
});