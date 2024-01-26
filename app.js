// Importa el módulo 'colors' para añadir color al texto en la consola.
const colors = require('colors');
// Importa el módulo 'fs.promises' para trabajar con operaciones de archivos de manera asíncrona.
const fs = require('fs').promises;
// Crea una interfaz de línea de comandos para leer la entrada del usuario y escribir en la salida estándar.
const readline = require('readline').createInterface({
  // Configura la interfaz de línea de comandos para utilizar la entrada estándar (stdin) y la salida estándar (stdout).
  input: process.stdin,
  output: process.stdout,
});

console.log('Este programa permite gestionar una lista de productos en una tienda.');

class Producto {
  #codigoproducto;  // Declaración de una propiedad privada para almacenar el código del producto.
  #nombreproducto;  // Declaración de una propiedad privada para almacenar el nombre del producto.
  #inventarioproducto;  // Declaración de una propiedad privada para almacenar la cantidad en inventario del producto.
  #precioproducto;  // Declaración de una propiedad privada para almacenar el precio del producto.

  constructor() {  // Constructor de la clase Producto.
    // Inicialización de las propiedades con valores predeterminados.
    this.#codigoproducto = '';  // Inicialización del código del producto como una cadena vacía.
    this.#nombreproducto = '';  // Inicialización del nombre del producto como una cadena vacía.
    this.#inventarioproducto = 0;  // Inicialización del inventario del producto como 0.
    this.#precioproducto = 0;  // Inicialización del precio del producto como 0.
  }

  get codigoproducto() {  // Método de acceso para obtener el valor de la propiedad privada codigoproducto.
    return this.#codigoproducto;
  }

  set codigoproducto(codigo) {  // Método de modificación para establecer el valor de la propiedad privada codigoproducto.
    this.#codigoproducto = codigo;
  }

  get nombreproducto() {  // Método de acceso para obtener el valor de la propiedad privada nombreproducto.
    return this.#nombreproducto;
  }

  set nombreproducto(nombre) {  // Método de modificación para establecer el valor de la propiedad privada nombreproducto.
    this.#nombreproducto = nombre;
  }

  get inventarioproducto() {  // Método de acceso para obtener el valor de la propiedad privada inventarioproducto.
    return this.#inventarioproducto;
  }

  set inventarioproducto(inventario) {  // Método de modificación para establecer el valor de la propiedad privada inventarioproducto.
    this.#inventarioproducto = inventario;
  }

  get precioproducto() {  // Método de acceso para obtener el valor de la propiedad privada precioproducto.
    return this.#precioproducto;
  }

  set precioproducto(precio) {  // Método de modificación para establecer el valor de la propiedad privada precioproducto.
    this.#precioproducto = precio;
  }
}


class ProductosTienda {
  #listaproductos;  // Declaración de una propiedad privada para almacenar la lista de productos.

  constructor() {  // Constructor de la clase ProductosTienda.
    this.#listaproductos = [];  // Inicialización de la lista de productos como un array vacío.
  }

  get listaproductos() {  // Método de acceso para obtener el valor de la propiedad privada listaproductos.
    return this.#listaproductos;
  }

  set listaproductos(lista) {  // Método de modificación para establecer el valor de la propiedad privada listaproductos.
    this.#listaproductos = lista;
  }

  mostrarproductos() {  // Método para mostrar los productos en la consola.
    this.#listaproductos.forEach((producto) => {
      console.log(
        `|     ` +
          producto.codigoproducto +
          `     |` +
          `      ` +
          producto.nombreproducto +
          `     |` +
          `      ` +
          producto.inventarioproducto +
          `     |` +
          `      ` +
          producto.precioproducto +
          `     |`
      );
    });
  }
}

const cargaarchivoproductos = async (productostienda) => {
  try {
    // Lee el contenido del archivo './datos.json' de forma asincrónica y espera a que se complete.
    const data = await fs.readFile('./datos.json', 'utf-8');    
    // Convierte los datos leídos del archivo JSON a un objeto y asigna la lista de productos a la propiedad 'listaproductos'.
    productostienda.listaproductos = JSON.parse(data);
    // Imprime un mensaje indicando que los productos se cargaron correctamente desde el archivo 'datos.json'.
    console.log(`Productos cargados desde datos.json`.bgBlue);
  } catch (error) {
    // Captura y maneja cualquier error que pueda ocurrir durante la lectura del archivo.
    console.error(`Error al cargar el archivo: ${error.message}`.bgRed);
  }
};

const agregarProducto = async (productostienda, nuevoProducto) => {
  // Agrega el nuevo producto a la lista de productos en 'listaproductos'.
  productostienda.listaproductos.push(nuevoProducto);
  // Imprime un mensaje indicando que se agregó un producto y muestra la información del nuevo producto.
  console.log(`Producto agregado:`.bgGreen);
  console.log(nuevoProducto);
  // Graba los productos actualizados en el archivo después de agregar el nuevo producto.
  await grabararchivoproductos(productostienda.listaproductos.map(producto => ({
    codigoproducto: producto.codigoproducto,
    nombreproducto: producto.nombreproducto,
    inventarioproducto: producto.inventarioproducto,
    precioproducto: producto.precioproducto,
  })));
};

const grabararchivoproductos = async (listaproductos) => {
  try {
    // Convierte la lista de productos a una cadena JSON con formato y espaciado para una mejor legibilidad.
    const cadenaJson = JSON.stringify(listaproductos, null, 2);
    // Especifica el nombre del archivo donde se guardarán los datos.
    const nombrearchivo = './datos.json';
    // Escribe la cadena JSON en el archivo de forma asincrónica y espera a que se complete.
    await fs.writeFile(nombrearchivo, cadenaJson, 'utf-8');   
    // Imprime un mensaje indicando que los datos se han guardado correctamente en el archivo.
    console.log(`DATOS GUARDADOS EN ${nombrearchivo}`.bgMagenta);
  } catch (error) {
    // Captura y maneja cualquier error que pueda ocurrir durante la escritura del archivo.
    console.error(`Error al guardar el archivo: ${error.message}`.bgRed);
  }
};

const mostrarMenu = () => {
  return new Promise((resolve) => {
    // Imprime un menú en la consola con opciones numeradas y colores.
    console.log(`=========================`.green);
    console.log(`     Seleccione una opción    `.green);
    console.log(`=========================\n`.green);
    console.log(`${'1'.green} Crear nuevo producto`);
    console.log(`${'2'.green} Listar productos`);
    console.log(`${'3'.green} Salir\n`);

    // Utiliza la interfaz `readline` para solicitar al usuario que seleccione una opción y resuelve la promesa con la opción seleccionada.
    readline.question('Seleccione una opción: ', (opt) => {
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    // Muestra un mensaje en la consola solicitando al usuario que presione ENTER para continuar.
    readline.question(`\nPresione ${'ENTER'.yellow} para continuar\n`, (opt) => {
      resolve();  // Resuelve la promesa después de que el usuario presione ENTER.
    });
  });
};

const obtenerDetallesProducto = async () => {
  return new Promise((resolve) => {
    // Crea una nueva instancia de la clase Producto.
    const nuevoProducto = new Producto();

    // Solicita al usuario que ingrese el código, nombre, inventario y precio del producto.
    readline.question('Código del producto: ', (codigo) => {
      nuevoProducto.codigoproducto = codigo;
      readline.question('Nombre del producto: ', (nombre) => {
        nuevoProducto.nombreproducto = nombre;
        readline.question('Inventario del producto: ', (inventario) => {
          nuevoProducto.inventarioproducto = parseInt(inventario);
          readline.question('Precio del producto: ', (precio) => {
            nuevoProducto.precioproducto = parseFloat(precio);
            resolve(nuevoProducto);  // Resuelve la promesa con el nuevo producto creado.
          });
        });
      });
    });
  });
};


const main = async () => {
  // Limpia la consola y muestra un mensaje de bienvenida.
  console.clear();
  console.log('***********************');
  console.log('**  PROYECTO CLASES  **');
  console.log('***********************\n');

  //crear una nueva instancia del constructor de la clase
  let productostienda = new ProductosTienda();

  // Carga la lista de productos desde el archivo al objeto productostienda.
  await cargaarchivoproductos(productostienda);
  
  let salir = false;
  while (!salir) {
    // Muestra el menú y espera a que el usuario elija una opción.
    const opcion = await mostrarMenu();

    switch (opcion) {
      case '1':
      //solicita y agrega un nuevo producto a la tienda.
      console.log(`Ingrese los detalles del nuevo producto:`.bgBlue);
        const nuevoProducto = await obtenerDetallesProducto();
        console.log(`Producto agregado:`.bgGreen);
        console.log(nuevoProducto);
        await agregarProducto(productostienda, nuevoProducto);
        await pausa();
        break;

      case '2':
      // muestra el listado de productos en la tienda.
        console.log(`Listado de productos:`.bgBlue);
        productostienda.mostrarproductos();
        await pausa();
        break;

      case '3':
      //establece 'salir' a true para salir del bucle y finalizar el programa.
        salir = true;
        break;
      default:
        console.log(`Opción no válida. Por favor, seleccione una opción válida.`.bgRed);
        await pausa();
        break;
    }
  }

// Cierra la interfaz 'readline' después de salir del bucle, indicando que no se recibirán más entradas del usuario.
readline.close();
// Imprime un mensaje de despedida en la consola con un fondo de color cyan, indicando que el programa ha finalizado.
console.log('¡Gracias por usar el programa!'.bgCyan);
};

// Llama a la función 'main' para iniciar la ejecución del programa. La función 'main' contiene la lógica principal del programa.
main();

console.log('Este programa permite gestionar una lista de productos en una tienda.');

