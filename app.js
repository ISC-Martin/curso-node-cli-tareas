const colors = require('colors');
const { guardarDB, leerDB } = require('./helpers/db');
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheklist
} = require('./helpers/inquierer');
const Tareas = require('./models/tareas');

console.clear();
const main = async() => {
  try {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = await leerDB();
    if (tareasDB) {
      tareas.cargarTareasFromArray(tareasDB);
    }
    do {
      opt = await inquirerMenu();
      switch (opt) {
        case 1:
          // Crear tarea
          const desc = await leerInput('Descripción:');
          tareas.crearTarea(desc);
          break;
        case 2:
          // Listar tareas
          tareas.listadoCompleto();
          break;
        case 3:
          // Listar tareas completadas
          tareas.listarPendientesCompletadas(true);
          break;
        case 4:
          // Listar tareas pendientes
          tareas.listarPendientesCompletadas(false);
          break;
        case 5:
          // Tareas completar | pendientes
          const ids = await mostrarListadoCheklist(tareas.listadoArr);
          tareas.toggleCompletadas(ids);
          break;
        case 6: 
          // Borrar tarea
          const id = await listadoTareasBorrar(tareas.listadoArr);
          if (id !== '0') {
            const ok = await confirmar(`Estas seguro? `);
            if(ok) {
              tareas.borrarTarea(id);
              console.log('Tarea borrada');
            }
            break;
          }          
      }

      guardarDB(tareas.listadoArr);
      if (opt !== 0) await pausa();
    } while (opt !== 0); 
  } catch (error) {
    throw error;
  }
}

main();