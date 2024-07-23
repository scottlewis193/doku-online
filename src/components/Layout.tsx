function Layout(props: { children?: any }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link yle="text/css" rel="stylesheet" href="/index.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          src="https://unpkg.com/htmx.org@2.0.1/dist/htmx.js"
          integrity="sha384-gpIh5aLQ0qmX8kZdyhsd6jA24uKLkqIr1WAGtantR4KsS97l/NRBvh8/8OYGThAf"
          crossorigin="anonymous"
        ></script>
        <script src="https://unpkg.com/htmx-ext-ws@2.0.0/ws.js"></script>
        <script type="module" src="/client.ts"></script>
        <title>Doku Online</title>
      </head>
      <body hx-ext="ws" ws-connect="ws://localhost:3000/ws">
        {props.children}
      </body>
    </html>
  );
}

export default Layout;
