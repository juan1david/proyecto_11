const colors = require('colors');
const fs = require('fs').promises;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Producto {
  #codigoproducto;
  #nombreproducto;
  #inventarioproducto;
  #precioproducto;
  constructor() {
    this.#codigoproducto = '';
    this.#nombreproducto = '';
    this.#inventarioproducto = 0;
    this.#precioproducto = 0;
  }

  get codigoproducto() {
    return this.#codigoproducto;
  }

  set codigoproducto(codigo) {
    this.#codigoproducto = codigo;
  }

  get nombreproducto() {
    return this.#nombreproducto;
  }

  set nombreproducto(nombre) {
    this.#nombreproducto = nombre;
  }

  get inventarioproducto() {
    return this.#inventarioproducto;
  }

  set inventarioproducto(inventario) {
    this.#inventarioproducto = inventario;
  }

  get precioproducto() {
    return this.#precioproducto;
  }

  set precioproducto(precio) {
    this.#precioproducto = precio;
  }
}

class ProductosTienda {
  #listaproductos;
  constructor() {
    this.#listaproductos = [];
  }

  get listaproductos() {
    return this.#listaproductos;
  }

  set listaproductos(lista) {
    this.#listaproductos = lista;
  }

  mostrarproductos() {
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
    const data = await fs.readFile('./datos.json', 'utf-8');
    productostienda.listaproductos = JSON.parse(data);
    console.log(`Productos cargados desde datos.json`.bgBlue);
  } catch (error) {
    console.error(`Error al cargar el archivo: ${error.message}`.bgRed);
  }
};

const agregarProducto = async (productostienda, nuevoProducto) => {
  productostienda.listaproductos.push(nuevoProducto);
  console.log(`Producto agregado:`.bgGreen);
  console.log(nuevoProducto);
  await grabararchivoproductos(productostienda.listaproductos.map(producto => ({
    codigoproducto: producto.codigoproducto,
    nombreproducto: producto.nombreproducto,
    inventarioproducto: producto.inventarioproducto,
    precioproducto: producto.precioproducto,
  })));
};

const grabararchivoproductos = async (listaproductos) => {
  try {
    const cadenaJson = JSON.stringify(listaproductos, null, 2);
    const nombrearchivo = './datos.json';
    await fs.writeFile(nombrearchivo, cadenaJson, 'utf-8');
    console.log(`DATOS GUARDADOS EN ${nombrearchivo}`.bgMagenta);
  } catch (error) {
    console.error(`Error al guardar el archivo: ${error.message}`.bgRed);
  }
};

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.log(`=========================`.green);
    console.log(`     Seleccione una opción    `.green);
    console.log(`=========================\n`.green);
    console.log(`${'1'.green} Crear nuevo producto`);
    console.log(`${'2'.green} Listar productos`);
    console.log(`${'3'.green} Salir\n`);

    readline.question('Seleccione una opción: ', (opt) => {
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    readline.question(`\nPresione ${'ENTER'.yellow} para continuar\n`, (opt) => {
      resolve();
    });
  });
};

const obtenerDetallesProducto = async () => {
  return new Promise((resolve) => {
    const nuevoProducto = new Producto();

    readline.question('Código del producto: ', (codigo) => {
      nuevoProducto.codigoproducto = codigo;
      readline.question('Nombre del producto: ', (nombre) => {
        nuevoProducto.nombreproducto = nombre;
        readline.question('Inventario del producto: ', (inventario) => {
          nuevoProducto.inventarioproducto = parseInt(inventario);
          readline.question('Precio del producto: ', (precio) => {
            nuevoProducto.precioproducto = parseFloat(precio);
            resolve(nuevoProducto);
          });
        });
      });
    });
  });
};

const main = async () => {
  console.clear();
  console.log('***********************');
  console.log('**  PROYECTO CLASES  **');
  console.log('***********************\n');

  let productostienda = new ProductosTienda();

  await cargaarchivoproductos(productostienda);
  
  let salir = false;
  while (!salir) {
    const opcion = await mostrarMenu();

    switch (opcion) {
      case '1':
        
      console.log(`Ingrese los detalles del nuevo producto:`.bgBlue);
        const nuevoProducto = await obtenerDetallesProducto();
        console.log(`Producto agregado:`.bgGreen);
        console.log(nuevoProducto);
        await agregarProducto(productostienda, nuevoProducto);
        await pausa();
        break;

      case '2':

        console.log(`Listado de productos:`.bgBlue);
        productostienda.mostrarproductos();
        await pausa();
        break;
      case '3':

        salir = true;
        break;
      default:
        console.log(`Opción no válida. Por favor, seleccione una opción válida.`.bgRed);
        await pausa();
        break;
    }
  }

  readline.close();
  console.log('¡Gracias por usar el programa!'.bgCyan);
};

main();

