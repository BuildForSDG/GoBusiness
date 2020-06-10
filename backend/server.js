/* eslint-disable no-console */
const app = require('./app');

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`GoBusiness on port::${port}`));
