const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  //create a channel
  conn.createChannel((err, ch) => {
    //declare a queue
    const q = "hello";

    //publish a message
    ch.assertQueue(q, { durable: false });
    ch.sendToQueue(q, new Buffer("Hello World"));
    console.log(`[x] Sent "Hello World!"`);
  });
  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
