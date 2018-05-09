$(document).ready(function ()
{
    $(document).on('click', '.home__filter__button:not(.home__filter__button--active)', function ()
    {
        $('.home__filter__button').removeClass('home__filter__button--active');
        $('.home__cards').attr('data-view', $(this).attr('data-view'));

        $(this).addClass('home__filter__button--active');
    });
});