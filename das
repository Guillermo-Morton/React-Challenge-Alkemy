[33mcommit c643ea8c61b7b9bda4294dccfe863bfa36a016a6[m[33m ([m[1;36mHEAD -> [m[1;32mesteticaYanimaciones[m[33m)[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Wed Jun 23 02:38:56 2021 -0300

    Si no se esta logueado, el navbar solo muestra el boton de login, una vez ingresamos cambia por dos botones de navegacion y uno para cerrar la sesion. Si estamos logueados no podemos acceder al login mediante la ruta, se nos redirige al home, si no estamos logueados no podemos acceder a ninguna otra ruta que no sea el login. Se agregregó un mensaje que indica que no hay equipos creados. Se seteo una altura minima a los contenedores de cada seccion para evitar el footer flotante en caso de que exista poco contenido

[33mcommit 73de7fed2707f1752df4fd23a3d2bf7b9c21c047[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Tue Jun 22 15:45:52 2021 -0300

    Se agregaron preguntas y advertencias al realizar acciones

[33mcommit be5a0e4dc7f109a7019a83662bff92aca048be47[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Tue Jun 22 13:32:33 2021 -0300

    Se actualizó la estetica de la seccion de busqueda, y del login. Ya no se puede editar un equipo si existe un equipo en creacion o edicion, entre otros detalles esteticos

[33mcommit 8e04e1a5b57ee33cc509775c8d3a10eb53eb9a4b[m[33m ([m[1;31morigin/esteticaYanimaciones[m[33m, [m[1;31morigin/dev[m[33m, [m[1;32mdev[m[33m)[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Sun Jun 20 20:56:46 2021 -0300

    Se actualizó la estetica del home

[33mcommit a51a82eb588a6eb51355a8356faa482dd7659b22[m[33m ([m[1;31morigin/crearEquipos[m[33m, [m[1;32mcrearEquipos[m[33m)[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Sat Jun 19 22:13:30 2021 -0300

    Ya se pueden crear equipos, editarlos, ver sus estadisticas. La pagina realiza redirecciones al login si el usuario no esta verificado con un token en ls

[33mcommit 852bbfaa679d40be7bb0b6c9cf401bc91703b8d1[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Fri Jun 18 15:33:45 2021 -0300

    Se muestran los datos promedios de altura y peso, la powerstat dominante del equipo, se pueden eliminar miembros, calculando nuevos valores en cuando a las powerstats y a las caracteristicas fisicas del equipo, se puede volver a completar un equipo una vez eliminados miembros del mismo

[33mcommit 7afbcbe15d04697d365d4ce5dc233a8f1ee3ef3e[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Wed Jun 16 22:10:00 2021 -0300

    Se despliegan correctamente los datos, la logica hace una suma de las powerstats del equipo y muestra los resultados en la parte superior de cada equipo

[33mcommit 6622d78c1abe6b03282184a2b730da9a1deee8ea[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Wed Jun 16 16:17:31 2021 -0300

    Se pueden crear equipos y mostrarlos en el home

[33mcommit 4256cc6c61581abb696a4cae6b72f27ea9b08439[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Tue Jun 15 03:23:13 2021 -0300

    Se actualizo la logica para que reciba no 1 resultado, sino todos los resultados correspondientes

[33mcommit 392446cc43ce66dfc1248468a486c5dc57e6f7e4[m[33m ([m[1;31morigin/buscadorHeroes[m[33m, [m[1;32mbuscadorHeroes[m[33m)[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Mon Jun 14 23:59:10 2021 -0300

    Se avanzo con la logica del buscador, el usuario ya puede buscar un heroe por su nombre, y recibir una card con su foto, nombre, si es heroe o villano y su cualidad mas destacable

[33mcommit 62679b1644dff0054e1d477ed34ecef092d7772a[m[33m ([m[1;32mlogin[m[33m)[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Mon Jun 14 19:55:17 2021 -0300

    Se actualizo el sistema, reemplazamos la forma convencional de validar el formulario para usar una libreria llamada Formik

[33mcommit d2a6b02fe3095310f33fe7b2f545f50570c71235[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Mon Jun 14 17:40:09 2021 -0300

    Se realizo la primera instancia del login, se puede ingresar y recibir el token desde la api

[33mcommit eaf193800b7c6c85e7af6883da4ff931e74dd5ca[m[33m ([m[1;32mmaquetado[m[33m)[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Mon Jun 14 16:53:42 2021 -0300

    Se agregó un maquetado basico, de esta forma tener una estructura sobre la cual trabajar la logica. Una vez esten listas las funcionalidades, se actualizará la estetica de la pagina mediante React Styled components

[33mcommit a2404a46bc2343554cca06db182fbe82d698c8ae[m[33m ([m[1;31morigin/main[m[33m, [m[1;32mmain[m[33m)[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Mon Jun 14 13:19:06 2021 -0300

    Se modificó el readme

[33mcommit e7926e6e747339854709121c631a830ec46c5898[m
Author: Guillermo Morton <guillermort2000@gmail.com>
Date:   Mon Jun 14 12:41:56 2021 -0300

    Initialize project using Create React App
