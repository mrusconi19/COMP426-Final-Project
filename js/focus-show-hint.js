$(document).ready(function () {
  const inputs = $('input');

  inputs.focusin(function () {
    $(this).parent().find('span.helper').addClass('helper-visible');
  });

  inputs.focusout(function () {
    $(this).parent().find('span.helper').removeClass('helper-visible');
  });
});

