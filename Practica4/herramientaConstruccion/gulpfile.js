const gulp = require('gulp');

// Tarea de ejemplo
gulp.task('mi-tarea', function() {
  // Coloca aquí el código de construcción o procesamiento
  // que deseas realizar en esta tarea
  console.log('Tarea ejecutada con éxito');
});

// Tarea por defecto
gulp.task('default', gulp.series('mi-tarea'));