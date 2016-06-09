$('a[data-remote-student="true"]').on('click', function(ev) {
  ev.preventDefault();
  $.ajax({
    url: $(this). attr('href'),
    method: 'get',
    success: loadStudents
  });
});

function loadStudents(data) {
  $.each(data, function(i, student) {
    $.ajax({
      url: student.url,
      name: student.name,
      //rivalry:
    });
  });
}
