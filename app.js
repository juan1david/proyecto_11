const colors = require('colors');
const fs = require('fs').promises;

class Producto {
  constructor(codigoproducto, nombreproducto, inventarioproducto, precioproducto) {
    this.codigoproducto = codigoproducto;
    this.nombreproducto = nombreproducto;
    this.inventarioproducto = inventarioproducto;
    this.precioproducto = precioproducto;
  }
}

class ProductosTienda {
  constructor() {
    this.listaproductos = [];
  }

  async cargaarchivoproductos() {
    try {
      const data = await fs.readFile('./datos.json', 'utf-8');
      this.listaproductos = JSON.parse(data);
      console.log(`Productos cargados desde datos1.json`.bgBlue);
    } catch (error) {
      console.error(`Error al cargar el archivo: ${error.message}`.bgRed);
    }
  }

  async agregarProducto(nuevoProducto) {
    this.listaproductos.push(nuevoProducto);
    console.log(`Producto agregado:`.bgGreen);
    console.log(nuevoProducto);
    await this.grabararchivoproductos();
  }

  async grabararchivoproductos() {
    try {
      const cadenaJson = JSON.stringify(this.listaproductos, null, 2);
      const nombrearchivo = 'datos.json';
      await fs.writeFile(nombrearchivo, cadenaJson, 'utf-8');
      console.log(`DATOS GUARDADOS EN ${nombrearchivo}`.bgMagenta);
    } catch (error) {
      console.error(`Error al guardar el archivo: ${error.message}`.bgRed);
    }
  }

  mostrarproductos() {
    this.listaproductos.forEach((producto) => {
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

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.log(`=========================`.green);
    console.log(`     Seleccione una opción    `.green);
    console.log(`=========================\n`.green);
    console.log(`${'1'.green} Crear nuevo producto`);
    console.log(`${'2'.green} Listar productos`);
    console.log(`${'3'.green} Salir\n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Seleccione una opción: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${'ENTER'.yellow} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

const main = async () => {
  console.clear();
  console.log('***********************');
  console.log('**  PROYECTO CLASES  **');
  console.log('***********************\n');

  let productostienda = new ProductosTienda();

  await productostienda.cargaarchivoproductos(); 

  let salir = false;
  while (!salir) {
    const opcion = await mostrarMenu();

    switch (opcion) {
      case '1':
        
        const nuevoProducto = new Producto(
          '08',
          'NUEVO PRODUCTO',
          5,
          25000
        ); 

        await productostienda.agregarProducto(nuevoProducto);
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

  console.log('¡Gracias por usar el programa!'.bgCyan);
};

main();
