$(document).ready(function() {
    $('span.year').text(new Date().getFullYear());
    $('span.next-year').text(new Date().getFullYear()+1);
});
