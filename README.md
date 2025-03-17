## Este es un conversor de monedas simple desarrollado con Angular 19.
### La aplicación permite a los usuarios convertir una cantidad de dinero de una moneda a otra utilizando tasas de cambio en tiempo real obtenidas de una API externa.

Características:

- Conversión de monedas en tiempo real: Los valores de conversión se actualizan dinámicamente a través de una API de cambio de divisas (*https://api.exchangerate-api.com/v4/latest/*).
- Selección de monedas: Los usuarios pueden elegir entre una lista de monedas disponibles para convertir.
- Entrada de cantidad personalizada: Los usuarios pueden ingresar la cantidad de dinero que desean convertir.
- Interfaz de usuario simple y reactiva: La aplicación presenta una interfaz limpia y accesible con controles de formulario intuitivos.

Tecnologías Utilizadas:
- Angular 19 para la implementación del frontend.
- HTTP Client para realizar peticiones a la API de tasas de cambio.
- Bootstrap 5 para el diseño responsivo de la interfaz de usuario.
- FormsModule y ngModel para la vinculación bidireccional de datos.
