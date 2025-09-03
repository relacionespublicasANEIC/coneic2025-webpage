# Congreso Nacional de Estudiantes de Ingeniería Civil: Barranquilla 2025

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Formulario de registro

carnet_id
colombian
name
email
university
address
country
phone_number
whatsapp
emergency_name
emergency_phone
blood_type
rh_factor
sex
feeding
health


        // Fields in the form.
        // carnet_id
        // colombian
        // name
        // email
        // university
        // address
        // country
        // phone_number
        // whatsapp
        // emergency_name
        // emergency_phone
        // blood_type
        // rh_factor
        // sex
        // feeding
        // health





## Database entries
key: custom-data-list
Tipo: HashTable
field: referencia de la transacción.
description: Este campo contiene la información que el usuario introdujo en el ormulario de ingreso en la página principal.
value_ejemplo:
  const metadata = {
            user: {
                name,
                email,
                university,
                address,
                country,
                phone_number,
                whatsapp: !!whatsapp
            },
            emergency_contact: {
                emergency_name,
                emergency_phone
            },
            health_description: {
                blood: `${blood_type}${rh_factor}`,
                sex, feeding, health
            },
            carnet: {
                id: carnetInfo.link,
                name: carnetInfo.title,
                prices: [carnetInfo.price_in_cents, carnetInfo.price_in_usd]
            }
        };


key: failed-requests
Tipo: Counter
description: Cuenta cuantas transaccion fallidas han habido.

key: aproved-requests
Tipo: Counter
descriptino: Cuenta cuentas transacciones correctas han habido.

key: transaction-data-list
Tipo: HashTable
field: A wompi transaction id or a transaction reference if paypal.

key: aproved-transactions-list
Tipo: Lista
descripción: Contiene el id de las transacciones correctas

key: emailed-id-list
Tipo: Lista
descripción: Contiene el id de la transacciones a las que ya se le ha enviado email y el email
example: [transaction id, email]

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
